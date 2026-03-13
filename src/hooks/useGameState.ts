import { useState, useCallback, useMemo, useEffect } from 'react';
import type { PlayerState, StatKey, TraitKey, Choice, GameMode, GameEvent, DiagnosisRecord } from '../types';
import { initialStats, valueStatKeys } from '../data/stats';
import { jobs } from '../data/jobs/index';
import { getRandomChildhoodEvents } from '../data/events-childhood';
import { getRandomWorkingEvents } from '../data/events-working';
import type { GameResultRecord, ExperienceReflection } from '../utils/storage';
import {
  getCurrentUserId,
  loginUser as storageLogin,
  logoutUser,
  saveGameResult,
  saveDiagnosisRecord,
  getDiagnosisRecords,
  getGameResults,
  getExperienceReflections,
} from '../utils/storage';

/** ゲーム全体の画面遷移状態 */
export type Screen = 'login' | 'top' | 'mode-select' | 'diagnosis-choice' | 'diagnosis' | 'game' | 'result' | 'diagnosis-detail' | 'game-result-detail' | 'encyclopedia';

/** ゲーム状態を管理するカスタムフック */
export function useGameState() {
  const [userId, setUserId] = useState<string | null>(() => getCurrentUserId());
  const [screen, setScreen] = useState<Screen>(() => getCurrentUserId() ? 'top' : 'login');
  const [gameMode, setGameMode] = useState<GameMode>('childhood');
  const [viewingRecord, setViewingRecord] = useState<DiagnosisRecord | null>(null);
  const [viewingGameResult, setViewingGameResult] = useState<GameResultRecord | null>(null);
  const [eventSeed, setEventSeed] = useState(() => Date.now());

  // Supabaseから取得したデータをstateに保持
  const [diagnosisRecords, setDiagnosisRecords] = useState<DiagnosisRecord[]>([]);
  const [gameResults, setGameResults] = useState<GameResultRecord[]>([]);
  const [experienceReflections, setExperienceReflections] = useState<ExperienceReflection[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [diagnosisOnly, setDiagnosisOnly] = useState(false);
  const [player, setPlayer] = useState<PlayerState>(createInitialPlayer());
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  /** 現在のモードに応じたイベント一覧（ランダム選出） */
  const currentEvents: GameEvent[] = useMemo(() => {
    void eventSeed;
    return gameMode === 'childhood' ? getRandomChildhoodEvents() : getRandomWorkingEvents();
  }, [gameMode, eventSeed]);

  /** ユーザーデータをSupabaseから読み込み */
  const loadUserData = useCallback(async () => {
    setDataLoaded(false);
    const [diag, results, reflections] = await Promise.all([
      getDiagnosisRecords(),
      getGameResults(),
      getExperienceReflections(),
    ]);
    setDiagnosisRecords(diag);
    setGameResults(results);
    setExperienceReflections(reflections);
    setDataLoaded(true);
  }, []);

  // ログイン済みの場合、初回マウント時にデータ読み込み
  useEffect(() => {
    if (userId) {
      loadUserData();
    }
  }, [userId, loadUserData]);

  /** ログイン */
  const login = useCallback(async (id: string) => {
    await storageLogin(id);
    setUserId(id);
    setScreen('top');
  }, []);

  /** ログアウト */
  const logout = useCallback(() => {
    logoutUser();
    setUserId(null);
    setPlayer(createInitialPlayer());
    setCurrentEventIndex(0);
    setDiagnosisRecords([]);
    setGameResults([]);
    setExperienceReflections([]);
    setDataLoaded(false);
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

  /** 診断完了（結果をSupabaseに保存） */
  const finishDiagnosis = useCallback(async (
    traits: Record<TraitKey, number>,
    primaryKey: TraitKey,
    secondaryKey: TraitKey,
    diagStats?: Record<StatKey, number>,
  ) => {
    // 診断結果を保存
    const record: DiagnosisRecord = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('ja-JP'),
      primaryTrait: primaryKey,
      secondaryTrait: secondaryKey,
      traits,
      stats: diagStats,
      gameMode,
    };
    await saveDiagnosisRecord(record);
    setDiagnosisRecords((prev) => [record, ...prev]);

    if (diagnosisOnly) {
      // 診断単体モード → 診断詳細を表示
      setViewingRecord(record);
      setScreen('diagnosis-detail');
      setDiagnosisOnly(false);
    } else {
      // ストーリーモード → ゲーム開始（診断ステータスは別管理、ストーリーの初期値には加算しない）
      setPlayer((prev) => ({
        ...prev,
        diagnosisTraits: traits,
        primaryTrait: primaryKey,
        diagnosisStats: diagStats,
      }));
      setScreen('game');
    }
  }, [gameMode, diagnosisOnly]);

  /** 過去の診断結果を再利用してゲーム開始（診断ステータスは別管理） */
  const reuseDiagnosis = useCallback((record: DiagnosisRecord) => {
    setPlayer((prev) => ({
      ...prev,
      diagnosisTraits: { ...record.traits },
      primaryTrait: record.primaryTrait,
      diagnosisStats: record.stats,
    }));
    setScreen('game');
  }, []);

  /** 選択肢を選んだ時の処理（価値観系ステータスはスキップ） */
  const selectChoice = useCallback(
    (eventId: string, choice: Choice) => {
      setPlayer((prev) => {
        const newStats = { ...prev.stats };
        for (const [key, value] of Object.entries(choice.effects)) {
          // 価値観系（satisfaction, income）はストーリーでは変動させない
          if (valueStatKeys.includes(key as StatKey)) continue;
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

  /** 結果画面で向いてそうな職種TOP5を計算（診断+ストーリー統合値を使用） */
  const getRecommendedJobs = useCallback(() => {
    const { discoveredJobIds } = player;
    // 診断statsとストーリーstatsを統合して使用
    const stats = { ...player.stats };
    if (player.diagnosisStats) {
      for (const [key, value] of Object.entries(player.diagnosisStats)) {
        stats[key as StatKey] = Math.min(20, stats[key as StatKey] + value);
      }
    }

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
      '挑戦': ['communication', 'planning'],
      'スポーツ': ['communication', 'care'],
      'リーダーシップ': ['communication', 'planning'],
      '起業': ['planning', 'analysis'],
      '防衛': ['stability', 'care'],
      '公務': ['stability'],
      '品質': ['stability', 'analysis'],
      '法務': ['stability', 'analysis'],
      '堅実': ['stability'],
      '資格': ['stability', 'technical'],
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

  /** 結果画面へ遷移（ゲーム結果を保存、診断+ストーリーの統合値） */
  const goToResult = useCallback(async () => {
    const recommended = getRecommendedJobs();
    // 保存用に診断statsとストーリーstatsを統合
    const combinedStats = { ...player.stats };
    if (player.diagnosisStats) {
      for (const [key, value] of Object.entries(player.diagnosisStats)) {
        combinedStats[key as StatKey] = Math.min(20, combinedStats[key as StatKey] + value);
      }
    }
    const result: GameResultRecord = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('ja-JP'),
      gameMode,
      primaryTrait: player.primaryTrait,
      stats: combinedStats,
      discoveredJobIds: [...player.discoveredJobIds],
      recommendedJobIds: recommended.map((j) => j.id),
    };
    await saveGameResult(result);
    setGameResults((prev) => [result, ...prev]);
    setScreen('result');
  }, [gameMode, player, getRecommendedJobs]);

  /** モード選択 → 診断選択or診断画面 */
  const selectMode = useCallback((mode: GameMode) => {
    setGameMode(mode);
    setEventSeed(Date.now());
    if (diagnosisRecords.length > 0) {
      setScreen('diagnosis-choice');
    } else {
      setScreen('diagnosis');
    }
  }, [diagnosisRecords]);

  /** 診断単体モードで診断を開始 */
  const startDiagnosisOnly = useCallback(() => {
    setDiagnosisOnly(true);
    setScreen('diagnosis');
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

  /** 全ゲーム結果から発見済み職種IDを集約 */
  const allDiscoveredJobIds = useMemo(() => {
    const ids = new Set<string>();
    for (const result of gameResults) {
      for (const id of result.discoveredJobIds) {
        ids.add(id);
      }
    }
    return [...ids];
  }, [gameResults]);

  /** 体験振り返りを楽観的にステートに追加 */
  const addReflection = useCallback((reflection: ExperienceReflection) => {
    setExperienceReflections((prev) => [reflection, ...prev]);
  }, []);

  /** 職種図鑑を開く */
  const goToEncyclopedia = useCallback(() => {
    setScreen('encyclopedia');
  }, []);

  /** 職種図鑑から戻る */
  const backFromEncyclopedia = useCallback(() => {
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
    diagnosisRecords,
    gameResults,
    dataLoaded,
    diagnosisOnly,
    login,
    logout,
    applyDiagnosisAnswer,
    finishDiagnosis,
    reuseDiagnosis,
    startDiagnosisOnly,
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
    allDiscoveredJobIds,
    experienceReflections,
    goToEncyclopedia,
    backFromEncyclopedia,
    addReflection,
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
