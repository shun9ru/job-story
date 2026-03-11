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
    allDiscoveredJobIds,
    experienceReflections,
    goToEncyclopedia,
    backFromEncyclopedia,
    addReflection,
  } = useGameState();

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
          onStart={() => setScreen('mode-select')}
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
}

export default App;
