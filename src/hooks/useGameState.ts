import { useState, useCallback } from 'react';
import type { PlayerState, StatKey, TraitKey, Choice, GameMode, GameEvent, DiagnosisRecord } from '../types';
import { initialStats } from '../data/stats';
import { getPrimaryTrait } from '../data/diagnosis';
import { jobs } from '../data/jobs/index';
import { childhoodEvents } from '../data/events-childhood';
import { workingEvents } from '../data/events-working';

/** ゲーム全体の画面遷移状態 */
export type Screen = 'top' | 'mode-select' | 'diagnosis' | 'game' | 'result' | 'diagnosis-detail';

/** ゲーム状態を管理するカスタムフック */
export function useGameState() {
  const [screen, setScreen] = useState<Screen>('top');
  const [gameMode, setGameMode] = useState<GameMode>('childhood');
  const [viewingRecord, setViewingRecord] = useState<DiagnosisRecord | null>(null);

  const [player, setPlayer] = useState<PlayerState>({
    stats: { ...initialStats },
    discoveredJobIds: [],
    selectedChoices: [],
    diagnosisTraits: {
      communication: 0,
      planning: 0,
      analysis: 0,
      stability: 0,
      challenge: 0,
      creative: 0,
      care: 0,
      technical: 0,
    },
    primaryTrait: 'communication',
  });

  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  /** 現在のモードに応じたイベント一覧 */
  const currentEvents: GameEvent[] = gameMode === 'childhood' ? childhoodEvents : workingEvents;

  /** 診断の回答を反映 */
  const applyDiagnosisAnswer = useCallback(
    (effects: Partial<Record<TraitKey, number>>) => {
      setPlayer((prev) => {
        const newTraits = { ...prev.diagnosisTraits };
        for (const [key, value] of Object.entries(effects)) {
          newTraits[key as TraitKey] += value!;
        }
        return { ...prev, diagnosisTraits: newTraits };
      });
    },
    [],
  );

  /** 診断完了 → ゲーム開始 */
  const finishDiagnosis = useCallback(() => {
    setPlayer((prev) => {
      const primary = getPrimaryTrait(prev.diagnosisTraits);
      const boostedStats = { ...prev.stats };
      const traitToStat: Record<TraitKey, StatKey> = {
        communication: 'communication',
        planning: 'planning',
        analysis: 'analysis',
        stability: 'stability',
        challenge: 'growth',
        creative: 'creative',
        care: 'care',
        technical: 'technical',
      };
      boostedStats[traitToStat[primary]] += 2;
      return { ...prev, primaryTrait: primary, stats: boostedStats };
    });
    setScreen('game');
  }, []);

  /** 選択肢を選んだ時の処理 */
  const selectChoice = useCallback(
    (eventId: string, choice: Choice) => {
      setPlayer((prev) => {
        const newStats = { ...prev.stats };
        for (const [key, value] of Object.entries(choice.effects)) {
          newStats[key as StatKey] = Math.min(
            20,
            Math.max(0, newStats[key as StatKey] + value!),
          );
        }
        const newDiscovered = [...new Set([...prev.discoveredJobIds, ...choice.unlockJobIds])];
        return {
          ...prev,
          stats: newStats,
          discoveredJobIds: newDiscovered,
          selectedChoices: [
            ...prev.selectedChoices,
            { eventId, choiceId: choice.id },
          ],
        };
      });
      setCurrentEventIndex((prev) => prev + 1);
    },
    [],
  );

  /** 結果画面で向いてそうな職種TOP5を計算 */
  const getRecommendedJobs = useCallback(() => {
    const { stats, discoveredJobIds } = player;

    const tagMap: Record<string, StatKey[]> = {
      '対人': ['communication'],
      'コミュニケーション': ['communication'],
      '営業': ['communication'],
      '接客': ['communication'],
      '企画': ['planning'],
      'メディア': ['planning'],
      '広告': ['planning', 'creative'],
      'クリエイティブ': ['creative'],
      'デザイン': ['creative'],
      '制作': ['creative'],
      '映像': ['creative'],
      '音楽': ['creative'],
      '写真': ['creative'],
      '表現': ['creative'],
      'データ': ['analysis'],
      '分析': ['analysis'],
      '数字': ['analysis'],
      '安定': ['stability'],
      'サポート': ['care'],
      'ケア': ['care'],
      '福祉': ['care'],
      '医療': ['care', 'technical'],
      '教育': ['care'],
      '保育': ['care'],
      '技術': ['technical'],
      '開発': ['technical'],
      '研究': ['technical', 'analysis'],
      'IT': ['technical'],
      'プログラミング': ['technical'],
      'AI': ['technical', 'analysis'],
      'セキュリティ': ['technical'],
      '設計': ['technical'],
      '専門': ['technical'],
      '戦略': ['planning', 'analysis'],
      'コンサル': ['analysis', 'communication'],
      '金融': ['analysis', 'stability'],
      '法律': ['analysis', 'stability'],
      'グローバル': ['communication'],
      '語学': ['communication'],
      '体力': ['care'],
      'エンタメ': ['creative', 'communication'],
      'ゲーム': ['creative', 'technical'],
      'マネジメント': ['communication', 'planning'],
      '管理': ['stability', 'planning'],
      'マーケティング': ['analysis', 'planning'],
      'SNS': ['creative', 'communication'],
      '高収入': ['analysis'],
      '社会貢献': ['care'],
    };

    const jobScores = jobs.map((job) => {
      let score = 0;
      if (discoveredJobIds.includes(job.id)) score += 5;

      for (const tag of job.tags) {
        const relevantStats = tagMap[tag];
        if (relevantStats) {
          for (const statKey of relevantStats) {
            score += stats[statKey];
          }
        }
      }
      return { job, score };
    });

    jobScores.sort((a, b) => b.score - a.score);
    return jobScores.slice(0, 5).map((s) => s.job);
  }, [player]);

  /** モード選択 */
  const selectMode = useCallback((mode: GameMode) => {
    setGameMode(mode);
    setScreen('diagnosis');
  }, []);

  /** 診断履歴を表示 */
  const viewDiagnosisRecord = useCallback((record: DiagnosisRecord) => {
    setViewingRecord(record);
    setScreen('diagnosis-detail');
  }, []);

  /** 診断詳細から戻る */
  const backFromDiagnosisDetail = useCallback(() => {
    setViewingRecord(null);
    setScreen('top');
  }, []);

  /** ゲームをリセットして最初からやり直す */
  const resetGame = useCallback(() => {
    setPlayer({
      stats: { ...initialStats },
      discoveredJobIds: [],
      selectedChoices: [],
      diagnosisTraits: {
        communication: 0,
        planning: 0,
        analysis: 0,
        stability: 0,
        challenge: 0,
        creative: 0,
        care: 0,
        technical: 0,
      },
      primaryTrait: 'communication',
    });
    setCurrentEventIndex(0);
    setScreen('top');
  }, []);

  /** 別モードで遊び直す */
  const switchMode = useCallback(() => {
    setPlayer({
      stats: { ...initialStats },
      discoveredJobIds: [],
      selectedChoices: [],
      diagnosisTraits: {
        communication: 0,
        planning: 0,
        analysis: 0,
        stability: 0,
        challenge: 0,
        creative: 0,
        care: 0,
        technical: 0,
      },
      primaryTrait: 'communication',
    });
    setCurrentEventIndex(0);
    setScreen('mode-select');
  }, []);

  return {
    screen,
    setScreen,
    gameMode,
    player,
    currentEventIndex,
    currentEvents,
    viewingRecord,
    applyDiagnosisAnswer,
    finishDiagnosis,
    selectChoice,
    getRecommendedJobs,
    selectMode,
    resetGame,
    switchMode,
    viewDiagnosisRecord,
    backFromDiagnosisDetail,
  };
}
