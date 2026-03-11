/** 職業体験ゲームの型定義 */

/** 体験ゲーム全体の定義 */
export interface JobExperience {
  jobId: string;
  title: string;
  subtitle: string;
  intro: {
    narration: string;
    character: ExperienceCharacter;
    briefing: string;
  };
  metrics: ExperienceMetric[];
  scenes: ExperienceScene[];
  ending: (scores: Record<string, number>) => EndingResult;
}

/** 登場キャラクター */
export interface ExperienceCharacter {
  name: string;
  emoji: string;
  role: string;
}

/** 追跡する指標 */
export interface ExperienceMetric {
  key: string;
  label: string;
  emoji: string;
  color: string;
}

/** 1シーン */
export interface ExperienceScene {
  id: string;
  title: string;
  timeLabel?: string;
  narration?: string;
  dialogues: Dialogue[];
  situation: string;
  choices: ExperienceChoice[];
}

/** 会話 */
export interface Dialogue {
  speaker: string;
  emoji: string;
  text: string;
  isPlayer?: boolean;
}

/** 選択肢 */
export interface ExperienceChoice {
  id: string;
  text: string;
  emoji: string;
  effects: Record<string, number>;
  feedback: DialogueFeedback;
}

/** 選択後のフィードバック */
export interface DialogueFeedback {
  narration: string;
  dialogues: Dialogue[];
  lesson: string;
}

/** エンディング結果 */
export interface EndingResult {
  title: string;
  emoji: string;
  summary: string;
  learnings: string[];
  realWorldNote: string;
}
