import { useState, useCallback, useMemo, useEffect } from 'react';
import type { PlayerState, StatKey, ValueKey, Choice, GameMode, GameEvent, DiagnosisRecord, ChoiceHistoryItem } from '../types';
import { initialStats, calcTagMatchScore } from '../data/stats';
import { jobs } from '../data/jobs/index';
import { getPreHighSchoolEvents, getHighSchoolEvents, getPathEvents, getVocationalEvents, getUniversityEvents, PATH_CHOICE_EVENT_ID, HIGHSCHOOL_CHOICE_EVENT_ID, VOCATIONAL_CHOICE_EVENT_ID, UNIVERSITY_CHOICE_EVENT_ID } from '../data/events-childhood';
import type { EducationPath, HighSchoolPath, VocationalPath, UniversityPath } from '../data/events-childhood';
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
  toggleGameResultFavorite,
  deleteGameResult as storageDeleteGameResult,
  deleteDiagnosisRecord as storageDeleteDiagnosisRecord,
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
  /** 直近の診断で確定した価値観・サブタイプ（結果画面で確実に参照するため） */
  const [latestDiagnosisValues, setLatestDiagnosisValues] = useState<Record<ValueKey, number> | undefined>(undefined);
  const [latestDiagnosisSecondaryStat, setLatestDiagnosisSecondaryStat] = useState<StatKey | undefined>(undefined);
  const [player, setPlayer] = useState<PlayerState>(createInitialPlayer());
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [highSchoolPath, setHighSchoolPath] = useState<HighSchoolPath | undefined>(undefined);
  const [educationPath, setEducationPath] = useState<EducationPath | undefined>(undefined);
  const [vocationalPath, setVocationalPath] = useState<VocationalPath | undefined>(undefined);
  const [universityPath, setUniversityPath] = useState<UniversityPath | undefined>(undefined);

  /** 子供時代モード：小学校＋中学校＋高校選択イベント（第一分岐前） */
  const preHSEvents: GameEvent[] = useMemo(() => {
    void eventSeed;
    return gameMode === 'childhood' ? getPreHighSchoolEvents() : [];
  }, [gameMode, eventSeed]);

  /** 現在のモードに応じたイベント一覧（多段階分岐） */
  const currentEvents: GameEvent[] = useMemo(() => {
    void eventSeed;
    if (gameMode !== 'childhood') return getRandomWorkingEvents();
    // 高校未選択：中学までのイベント + 高校選択イベント
    if (!highSchoolPath) return preHSEvents;
    // 中卒就職：高校イベントをスキップして就職ルートへ
    if ((educationPath as string) === 'work-middle') {
      const pathEvents = getPathEvents('work');
      return [...preHSEvents, ...pathEvents];
    }
    // 高校選択済み：+ 高校イベント + 進路選択イベント
    const hsEvents = getHighSchoolEvents(highSchoolPath);
    if (!educationPath) return [...preHSEvents, ...hsEvents];
    // 進路選択済み：パスイベントを追加
    const pathEvents = getPathEvents(educationPath);
    // 専門学校で種類未選択：種類選択イベントまで
    if (educationPath === 'vocational' && !vocationalPath) {
      return [...preHSEvents, ...hsEvents, ...pathEvents];
    }
    // 専門学校で種類選択済み：専門学校イベントを追加
    if (educationPath === 'vocational' && vocationalPath) {
      return [...preHSEvents, ...hsEvents, ...pathEvents, ...getVocationalEvents(vocationalPath)];
    }
    // 大学で学部未選択：学部選択イベントまで
    if (educationPath === 'university' && !universityPath) {
      return [...preHSEvents, ...hsEvents, ...pathEvents];
    }
    // 大学で学部選択済み：学部別イベントを追加
    if (educationPath === 'university' && universityPath) {
      return [...preHSEvents, ...hsEvents, ...pathEvents, ...getUniversityEvents(universityPath)];
    }
    // 就職：全イベント
    return [...preHSEvents, ...hsEvents, ...pathEvents];
  }, [gameMode, eventSeed, highSchoolPath, educationPath, vocationalPath, universityPath, preHSEvents]);

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

  /** 診断の回答を反映（StatKeyベース） */
  const applyDiagnosisAnswer = useCallback(
    (_effects: Partial<Record<StatKey, number>>) => {
      // 診断中の回答反映はDiagnosisPage内で管理するため、ここでは何もしない
    },
    [],
  );

  /** 診断完了（結果をSupabaseに保存） */
  const finishDiagnosis = useCallback(async (
    stats: Record<StatKey, number>,
    values: Record<ValueKey, number>,
    primaryKey: StatKey,
    secondaryKey: StatKey,
    choiceHistory?: ChoiceHistoryItem[],
  ) => {
    // 診断結果を保存
    const record: DiagnosisRecord = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('ja-JP'),
      primaryStat: primaryKey,
      secondaryStat: secondaryKey,
      stats,
      values,
      gameMode,
      choiceHistory,
    };
    // 診断履歴をプレイヤーにもセット（ストーリー後のAI相談で使う）
    if (choiceHistory?.length) {
      setPlayer((p) => ({ ...p, choiceHistory: [...p.choiceHistory, ...choiceHistory] }));
    }
    try {
      await saveDiagnosisRecord(record);
    } catch (e) {
      console.error('Failed to save diagnosis record:', e);
    }
    setDiagnosisRecords((prev) => [record, ...prev]);
    setLatestDiagnosisValues(values);
    setLatestDiagnosisSecondaryStat(secondaryKey);

    // diagnosisOnly の最新値を直接取得（useCallback のクロージャ問題を回避）
    setDiagnosisOnly((prev) => {
      if (prev) {
        // 診断単体モード → 診断詳細を表示
        setViewingRecord(record);
        setScreen('diagnosis-detail');
      } else {
        // ストーリーモード → ゲーム開始
        setPlayer((p) => ({ ...p, primaryStat: primaryKey }));
        setScreen('game');
      }
      return false;
    });
  }, [gameMode]);

  /** 過去の診断結果を再利用してゲーム開始 */
  const reuseDiagnosis = useCallback((record: DiagnosisRecord) => {
    setPlayer((prev) => ({
      ...prev,
      primaryStat: record.primaryStat,
    }));
    setLatestDiagnosisValues(record.values);
    setLatestDiagnosisSecondaryStat(record.secondaryStat);
    setScreen('game');
  }, []);

  /** 選択肢を選んだ時の処理 */
  const selectChoice = useCallback(
    (eventId: string, choice: Choice, eventTitle?: string) => {
      // 高校選択イベントの分岐処理
      if (eventId === HIGHSCHOOL_CHOICE_EVENT_ID) {
        if (choice.id === 'hs-work') {
          // 中卒で就職 → 高校をスキップして就職ルートへ
          setHighSchoolPath('work' as HighSchoolPath);
          setEducationPath('work-middle' as EducationPath);
        } else {
          const hsMap: Record<string, HighSchoolPath> = {
            'hs-general': 'general',
            'hs-technical': 'technical',
            'hs-commercial': 'commercial',
            'hs-agricultural': 'agricultural',
            'hs-sports': 'sports',
          };
          const selectedHS = hsMap[choice.id];
          if (selectedHS) {
            setHighSchoolPath(selectedHS);
          }
        }
      }

      // 進路選択イベントの分岐処理
      if (eventId === PATH_CHOICE_EVENT_ID) {
        const pathMap: Record<string, EducationPath> = {
          'path-university': 'university',
          'path-vocational': 'vocational',
          'path-work': 'work',
        };
        const selectedPath = pathMap[choice.id];
        if (selectedPath) {
          setEducationPath(selectedPath);
        }
      }

      // 専門学校種類選択イベントの分岐処理
      if (eventId === VOCATIONAL_CHOICE_EVENT_ID) {
        const vocMap: Record<string, VocationalPath> = {
          'voc-it-design': 'it-design',
          'voc-medical': 'medical',
          'voc-culinary': 'culinary',
          'voc-beauty': 'beauty',
          'voc-entertainment': 'entertainment',
          'voc-business': 'business',
          'voc-sports': 'sports',
          'voc-animal': 'animal',
          'voc-architecture': 'architecture',
        };
        const selectedVoc = vocMap[choice.id];
        if (selectedVoc) {
          setVocationalPath(selectedVoc);
        }
      }

      // 大学学部選択イベントの分岐処理
      if (eventId === UNIVERSITY_CHOICE_EVENT_ID) {
        const uniMap: Record<string, UniversityPath> = {
          'uni-humanities': 'humanities',
          'uni-law-economics': 'law-economics',
          'uni-science-engineering': 'science-engineering',
          'uni-medical': 'medical',
          'uni-education': 'education',
          'uni-informatics': 'informatics',
        };
        const selectedUni = uniMap[choice.id];
        if (selectedUni) {
          setUniversityPath(selectedUni);
        }
      }

      setPlayer((prev) => {
        const newStats = { ...prev.stats };
        for (const [key, value] of Object.entries(choice.effects)) {
          newStats[key as StatKey] = Math.min(
            100,
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
          choiceHistory: [
            ...prev.choiceHistory,
            ...(eventTitle ? [{ question: eventTitle, chosen: choice.text }] : []),
          ],
        };
      });
      setCurrentEventIndex((prev) => prev + 1);
    },
    [],
  );

  /** 結果画面で向いてそうな職種TOP5を計算 */
  const getRecommendedJobs = useCallback(() => {
    const { discoveredJobIds } = player;

    const jobScores = jobs.map((job) => ({
      job,
      score: calcTagMatchScore(job.tags, player.stats, discoveredJobIds, job.id),
    }));

    jobScores.sort((a, b) => b.score - a.score);
    return jobScores.slice(0, 5).map((s) => s.job);
  }, [player]);

  /** 結果画面へ遷移（ゲーム結果を保存） */
  const goToResult = useCallback(async () => {
    const recommended = getRecommendedJobs();
    const result: GameResultRecord = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('ja-JP'),
      gameMode,
      primaryStat: player.primaryStat,
      stats: { ...player.stats },
      discoveredJobIds: [...player.discoveredJobIds],
      recommendedJobIds: recommended.map((j) => j.id),
      choiceHistory: player.choiceHistory.length > 0 ? player.choiceHistory : undefined,
    };
    try {
      await saveGameResult(result);
    } catch (e) {
      console.error('Failed to save game result:', e);
    }
    setGameResults((prev) => [result, ...prev]);
    setScreen('result');
  }, [gameMode, player, getRecommendedJobs]);

  /** モード選択 → 診断選択or診断画面 */
  const selectMode = useCallback((mode: GameMode) => {
    setGameMode(mode);
    setEventSeed(Date.now());
    setDiagnosisOnly(false);
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
    setDiagnosisOnly(false);
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

  /** ゲーム結果のお気に入りを切り替え */
  const toggleGameFavorite = useCallback(async (id: string) => {
    const target = gameResults.find((r) => r.id === id);
    if (!target) return;
    const newFav = !target.favorite;
    setGameResults((prev) =>
      prev.map((r) => (r.id === id ? { ...r, favorite: newFav } : r)),
    );
    await toggleGameResultFavorite(id, newFav);
  }, [gameResults]);

  /** ゲーム結果を削除 */
  const deleteGameResultById = useCallback(async (id: string) => {
    setGameResults((prev) => prev.filter((r) => r.id !== id));
    await storageDeleteGameResult(id);
  }, []);

  /** 診断履歴を削除 */
  const deleteDiagnosisById = useCallback(async (id: string) => {
    setDiagnosisRecords((prev) => prev.filter((r) => r.id !== id));
    await storageDeleteDiagnosisRecord(id);
  }, []);

  /** 全ゲーム結果から発見済み職種IDを集約（実在する職種のみ） */
  const allDiscoveredJobIds = useMemo(() => {
    const validJobIds = new Set(jobs.map((j) => j.id));
    const ids = new Set<string>();
    for (const result of gameResults) {
      for (const id of result.discoveredJobIds) {
        if (validJobIds.has(id)) {
          ids.add(id);
        }
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
    setHighSchoolPath(undefined);
    setEducationPath(undefined);
    setVocationalPath(undefined);
    setUniversityPath(undefined);
    setScreen('top');
  }, []);

  /** 別モードで遊び直す */
  const switchMode = useCallback(() => {
    setPlayer(createInitialPlayer());
    setCurrentEventIndex(0);
    setHighSchoolPath(undefined);
    setEducationPath(undefined);
    setVocationalPath(undefined);
    setUniversityPath(undefined);
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
    latestDiagnosisValues,
    latestDiagnosisSecondaryStat,
    highSchoolPath,
    educationPath,
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
    toggleGameFavorite,
    deleteGameResultById,
    deleteDiagnosisById,
  };
}

function createInitialPlayer(): PlayerState {
  return {
    stats: { ...initialStats },
    discoveredJobIds: [],
    selectedChoices: [],
    choiceHistory: [],
    primaryStat: 'communication',
  };
}
