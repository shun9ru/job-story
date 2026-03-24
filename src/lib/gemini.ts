const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY as string;
const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
const GEMINI_MODEL = 'gemini-2.0-flash';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: { text?: string }[];
    };
  }[];
}

interface GroqResponse {
  choices?: {
    message?: { content?: string };
  }[];
}

/** 指定ミリ秒待つ */
function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ============================================================
// リクエストキュー：同時に1つだけ実行、呼び出し間隔を保証
// ============================================================
const MIN_INTERVAL_MS = 4000;
let lastRequestTime = 0;
let queue: Promise<unknown> = Promise.resolve();

function enqueue<T>(fn: () => Promise<T>): Promise<T> {
  const task = queue.then(async () => {
    const now = Date.now();
    const elapsed = now - lastRequestTime;
    if (elapsed < MIN_INTERVAL_MS) {
      await wait(MIN_INTERVAL_MS - elapsed);
    }
    lastRequestTime = Date.now();
    return fn();
  });
  queue = task.catch(() => {});
  return task;
}

// ============================================================
// 公開API：Gemini → Groq のフォールバック付き
// ============================================================

export async function generateWithGemini(prompt: string): Promise<string> {
  return enqueue(() => generateWithFallback(prompt));
}

async function generateWithFallback(prompt: string): Promise<string> {
  // Groqを使用
  if (GROQ_API_KEY) {
    try {
      return await callGroq(prompt);
    } catch (e) {
      console.warn('Groq失敗:', (e as Error).message);
      throw e;
    }
  }

  // GeminiはGroqが未設定の場合のみフォールバック
  if (GEMINI_API_KEY) {
    try {
      return await callGemini(prompt);
    } catch (e) {
      console.warn('Gemini失敗:', (e as Error).message);
      throw e;
    }
  }

  throw new Error('利用可能なAI APIがありません（GROQ_API_KEYが未設定）');
}

// ============================================================
// Gemini呼び出し（1回のみ、429は即フォールバック）
// ============================================================
async function callGemini(prompt: string): Promise<string> {
  const url = `${GEMINI_API_BASE}/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 4096 },
    }),
  });

  if (res.ok) {
    const data: GeminiResponse = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('Gemini: 空のレスポンス');
    return text;
  }

  if (res.status === 429) {
    throw new Error('GEMINI_RATE_LIMITED');
  }

  const error = await res.text();
  throw new Error(`Gemini API error: ${res.status} ${error}`);
}

// ============================================================
// Groq呼び出し（リトライ付き）
// ============================================================
async function callGroq(prompt: string): Promise<string> {
  for (let attempt = 0; attempt < 2; attempt++) {
    if (attempt > 0) await wait(5000);

    const res = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 16384,
      }),
    });

    if (res.ok) {
      const data: GroqResponse = await res.json();
      const text = data.choices?.[0]?.message?.content;
      if (!text) throw new Error('Groq: 空のレスポンス');
      return text;
    }

    if (res.status === 429) {
      console.warn(`Groq rate limited (attempt ${attempt + 1}/2)`);
      continue;
    }

    const error = await res.text();
    throw new Error(`Groq API error: ${res.status} ${error}`);
  }

  throw new Error('GROQ_RATE_LIMITED');
}
