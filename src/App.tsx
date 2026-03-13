import { useState, useCallback } from 'react';
import { LoginPage } from './components/LoginPage';
import { TopPage } from './components/TopPage';
import { ModeSelectPage } from './components/ModeSelectPage';
import { DiagnosisChoicePage } from './components/DiagnosisChoicePage';
import { DiagnosisPage } from './components/DiagnosisPage';
import { DiagnosisDetailPage } from './components/DiagnosisDetailPage';
import { GamePage } from './components/GamePage';
import { ResultPage } from './components/ResultPage';
import { GameResultDetailPage } from './components/GameResultDetailPage';
import { JobEncyclopediaPage } from './components/JobEncyclopediaPage';
import { useGameState } from './hooks/useGameState';

/** フローティングホームボタン */
function HomeButton({ onClick }: { onClick: () => void }) {
  const [confirming, setConfirming] = useState(false);

  const handleClick = useCallback(() => {
    if (confirming) {
      setConfirming(false);
      onClick();
    } else {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
    }
  }, [confirming, onClick]);

  return (
    <button
      onClick={handleClick}
      className={`fixed top-3 left-3 z-[100] flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg backdrop-blur transition-all duration-200 cursor-pointer ${
        confirming
          ? 'bg-red-500 text-white shadow-red-200'
          : 'bg-white/90 text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-xl'
      }`}
    >
      <span className="text-sm">{confirming ? '⚠️' : '🏠'}</span>
      <span className="text-xs font-bold">{confirming ? 'ホームに戻る？' : 'ホーム'}</span>
    </button>
  );
}

function App() {
  const {
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
  } = useGameState();

  const goHome = useCallback(() => setScreen('top'), [setScreen]);
  const showHomeButton = screen !== 'login' && screen !== 'top';

  const renderScreen = () => {
    switch (screen) {
      case 'login':
        return <LoginPage onLogin={login} />;

      case 'top':
        return (
          <TopPage
            userId={userId!}
            diagRecords={diagnosisRecords}
            gameResults={gameResults}
            dataLoaded={dataLoaded}
            onStartStory={() => setScreen('mode-select')}
            onStartDiagnosis={startDiagnosisOnly}
            onViewDiagnosis={viewDiagnosisRecord}
            onViewGameResult={viewGameResult}
            onEncyclopedia={goToEncyclopedia}
            onLogout={logout}
          />
        );

      case 'mode-select':
        return <ModeSelectPage onSelect={selectMode} />;

      case 'diagnosis-choice':
        return (
          <DiagnosisChoicePage
            records={diagnosisRecords}
            onReuse={reuseDiagnosis}
            onRedo={goToDiagnosis}
          />
        );

      case 'diagnosis':
        return (
          <DiagnosisPage
            gameMode={gameMode}
            diagnosisOnly={diagnosisOnly}
            onAnswer={applyDiagnosisAnswer}
            onComplete={finishDiagnosis}
          />
        );

      case 'diagnosis-detail':
        return viewingRecord ? (
          <DiagnosisDetailPage
            record={viewingRecord}
            onBack={backFromDiagnosisDetail}
          />
        ) : null;

      case 'game':
        return (
          <GamePage
            gameMode={gameMode}
            player={player}
            events={currentEvents}
            currentEventIndex={currentEventIndex}
            onSelectChoice={selectChoice}
            onFinish={goToResult}
          />
        );

      case 'result':
        return (
          <ResultPage
            gameMode={gameMode}
            player={player}
            recommendedJobs={getRecommendedJobs()}
            onRestart={resetGame}
            onSwitchMode={switchMode}
          />
        );

      case 'game-result-detail':
        return viewingGameResult ? (
          <GameResultDetailPage
            result={viewingGameResult}
            onBack={backFromGameResult}
          />
        ) : null;

      case 'encyclopedia':
        return (
          <JobEncyclopediaPage
            allDiscoveredJobIds={allDiscoveredJobIds}
            reflections={experienceReflections}
            onBack={backFromEncyclopedia}
            onReflectionSaved={addReflection}
          />
        );
    }
  };

  return (
    <>
      {showHomeButton && <HomeButton onClick={goHome} />}
      {renderScreen()}
    </>
  );
}

export default App;
