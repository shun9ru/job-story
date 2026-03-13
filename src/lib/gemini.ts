const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: { text?: string }[];
    };
  }[];
}

/** レート制限時の待機時間を取得（秒） */
function getRetryDelay(errorBody: string): number {
  try {
    const parsed = JSON.parse(errorBody);
    const retryInfo = parsed.error?.details?.find(
      (d: { '@type': string }) => d['@type']?.includes('RetryInfo'),
    );
    if (retryInfo?.retryDelay) {
      const seconds = parseInt(retryInfo.retryDelay, 10);
      if (!isNaN(seconds)) return seconds;
    }
  } catch {
    // パース失敗時はデフォルト
  }
  return 15;
}

/** Gemini Flash APIを呼び出してテキスト生成（レート制限時は自動リトライ） */
export async function generateWithGemini(prompt: string, maxRetries = 2): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('VITE_GEMINI_API_KEY が設定されていません');
  }

  const body = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.9,
      maxOutputTokens: 1024,
    },
  });

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });

    if (res.ok) {
      const data: GeminiResponse = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error('Gemini APIから空のレスポンス');
      }
      return text;
    }

    // 429 (レート制限) の場合はリトライ
    if (res.status === 429 && attempt < maxRetries) {
      const errorBody = await res.text();
      const delay = getRetryDelay(errorBody);
      const waitSec = Math.min(delay + 2, 65); // APIが示す待機時間 + 2秒の余裕
      console.warn(`Gemini API rate limited. Retrying in ${waitSec}s... (attempt ${attempt + 1}/${maxRetries})`);
      await new Promise((resolve) => setTimeout(resolve, waitSec * 1000));
      continue;
    }

    const error = await res.text();
    throw new Error(`Gemini API error: ${res.status} ${error}`);
  }

  throw new Error('Gemini API: max retries exceeded');
}
