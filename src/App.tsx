import { TopPage } from './components/TopPage';
import { ModeSelectPage } from './components/ModeSelectPage';
import { DiagnosisPage } from './components/DiagnosisPage';
import { DiagnosisDetailPage } from './components/DiagnosisDetailPage';
import { GamePage } from './components/GamePage';
import { ResultPage } from './components/ResultPage';
import { useGameState } from './hooks/useGameState';

function App() {
  const {
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
  } = useGameState();

  switch (screen) {
    case 'top':
      return (
        <TopPage
          onStart={() => setScreen('mode-select')}
          onViewDiagnosis={viewDiagnosisRecord}
        />
      );

    case 'mode-select':
      return <ModeSelectPage onSelect={selectMode} />;

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
          onFinish={() => setScreen('result')}
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
  }
}

export default App;
