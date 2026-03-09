import { useState, useCallback, useMemo } from 'react';
import type { PlayerState, StatKey, TraitKey, Choice, GameMode, GameEvent, DiagnosisRecord } from '../types';
import { initialStats } from '../data/stats';
import { getPrimaryTrait } from '../data/diagnosis';
import { jobs } from '../data/jobs/index';
import { getRandomChildhoodEvents } from '../data/events-childhood';
import { getRandomWorkingEvents } from '../data/events-working';
import type { GameResultRecord } from '../utils/storage';
import { getCurrentUserId, loginUser, logoutUser, saveGameResult, hasDiagnosisRecords } from '../utils/storage';

/** ゲーム全体の画面遷移状態 */
export type Screen = 'login' | 'top' | 'mode-select' | 'diagnosis-choice' | 'diagnosis' | 'game' | 'result' | 'diagnosis-detail' | 'game-result-detail';

/** ゲーム状態を管理するカスタムフック */
export function useGameState() {
  const [userId, setUserId] = useState<string | null>(() => getCurrentUserId());
  const [screen, setScreen] = useState<Screen>(() => getCurrentUserId() ? 'top' : 'login');
  const [gameMode, setGameMode] = useState<GameMode>('childhood');
  const [viewingRecord, setViewingRecord] = useState<DiagnosisRecord | null>(null);
  const [viewingGameResult, setViewingGameResult] = useState<GameResultRecord | null>(null);
  const [eventSeed, setEventSeed] = useState(() => Date.now());

  const [player, setPlayer] = useState<PlayerState>(createInitialPlayer());

  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  /** 現在のモードに応じたイベント一覧（ランダム選出） */
  const currentEvents: GameEvent[] = useMemo(() => {
    // eventSeedが変わるたびに再選出される
    void eventSeed;
    return gameMode === 'childhood' ? getRandomChildhoodEvents() : getRandomWorkingEvents();
  }, [gameMode, eventSeed]);

  /** ログイン */
  const login = useCallback((id: string) => {
    loginUser(id);
    setUserId(id);
    setScreen('top');
  }, []);

  /** ログアウト */
  const logout = useCallback(() => {
    logoutUser();
    setUserId(null);
    setPlayer(createInitialPlayer());
    setCurrentEventIndex(0);
    setScreen('login');
  }, []);

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

  /** 過去の診断結果を再利用してゲーム開始 */
  const reuseDiagnosis = useCallback((record: DiagnosisRecord) => {
    setPlayer((prev) => {
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
      boostedStats[traitToStat[record.primaryTrait]] += 2;
      return {
        ...prev,
        diagnosisTraits: { ...record.traits },
        primaryTrait: record.primaryTrait,
        stats: boostedStats,
      };
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

  /** 結果画面へ遷移（ゲーム結果を保存） */
  const goToResult = useCallback(() => {
    const recommended = getRecommendedJobs();
    saveGameResult({
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('ja-JP'),
      gameMode,
      primaryTrait: player.primaryTrait,
      stats: { ...player.stats },
      discoveredJobIds: [...player.discoveredJobIds],
      recommendedJobIds: recommended.map((j) => j.id),
    });
    setScreen('result');
  }, [gameMode, player, getRecommendedJobs]);

  /** モード選択 → 診断選択or診断画面 */
  const selectMode = useCallback((mode: GameMode) => {
    setGameMode(mode);
    setEventSeed(Date.now());
    if (hasDiagnosisRecords()) {
      setScreen('diagnosis-choice');
    } else {
      setScreen('diagnosis');
    }
  }, []);

  /** 診断選択で「やり直す」を選んだ場合 */
  const goToDiagnosis = useCallback(() => {
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

  /** ゲーム結果詳細を表示 */
  const viewGameResult = useCallback((result: GameResultRecord) => {
    setViewingGameResult(result);
    setScreen('game-result-detail');
  }, []);

  /** ゲーム結果詳細から戻る */
  const backFromGameResult = useCallback(() => {
    setViewingGameResult(null);
    setScreen('top');
  }, []);

  /** ゲームをリセットして最初からやり直す */
  const resetGame = useCallback(() => {
    setPlayer(createInitialPlayer());
    setCurrentEventIndex(0);
    setScreen('top');
  }, []);

  /** 別モードで遊び直す */
  const switchMode = useCallback(() => {
    setPlayer(createInitialPlayer());
    setCurrentEventIndex(0);
    setScreen('mode-select');
  }, []);

  return {
    screen,
    setScreen,
    userId,
    gameMode,
    player,
    currentEventIndex,
    currentEvents,
    viewingRecord,
    viewingGameResult,
    login,
    logout,
    applyDiagnosisAnswer,
    finishDiagnosis,
    reuseDiagnosis,
    selectChoice,
    getRecommendedJobs,
    goToResult,
    goToDiagnosis,
    selectMode,
    resetGame,
    switchMode,
    viewDiagnosisRecord,
    backFromDiagnosisDetail,
    viewGameResult,
    backFromGameResult,
  };
}

function createInitialPlayer(): PlayerState {
  return {
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
  };
}
