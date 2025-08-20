import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import QuestionModal from './components/QuestionModal';
import Scoreboard from './components/Scoreboard';
import PlayerList from './components/PlayerList';
import questionsData from './data/questions.json';
import playersData from './data/players.json';
import './styles/App.css';

function App() {
  const [themes, setThemes] = useState([]);
  const [players, setPlayers] = useState([]);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showScoreboard, setShowScoreboard] = useState(false);

  useEffect(() => {
    setThemes(questionsData.themes);
    setPlayers(playersData);
  }, []);

  const handleQuestionSelect = (question) => {
    setCurrentQuestion(question);
  };

  const handleAnswer = (playerId, points, isCorrect) => {
    if (isCorrect && playerId) {
      setPlayers(prevPlayers =>
        prevPlayers.map(player =>
          player.id === playerId
            ? { ...player, score: player.score + points }
            : player
        )
      );
    }
    
    setUsedQuestions(prev => [...prev, currentQuestion.id]);
    setCurrentQuestion(null);
  };

  const handleScoreChange = (playerId, points) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player.id === playerId
          ? { ...player, score: Math.max(0, player.score + points) }
          : player
      )
    );
  };

  const resetGame = () => {
    if (window.confirm('Вы уверены, что хотите начать игру заново? Все очки будут сброшены.')) {
      setPlayers(players.map(player => ({ ...player, score: 0 })));
      setUsedQuestions([]);
    }
  };

  return (
    <div className="app">
      <div className="header">
        <h1>🎯 СВОЯ ИГРА 🎯</h1>
      </div>

      <div className="controls">
        <button className="control-button" onClick={() => setShowScoreboard(true)}>
          📊 Рейтинг
        </button>
        <button className="control-button" onClick={resetGame}>
          🔄 Новая игра
        </button>
      </div>

      <GameBoard
        themes={themes}
        usedQuestions={usedQuestions}
        onQuestionSelect={handleQuestionSelect}
      />

      <PlayerList players={players} onScoreChange={handleScoreChange} />

      {currentQuestion && (
        <QuestionModal
          question={currentQuestion}
          players={players}
          onAnswer={handleAnswer}
          onClose={() => setCurrentQuestion(null)}
        />
      )}

      {showScoreboard && (
        <Scoreboard
          players={players}
          onClose={() => setShowScoreboard(false)}
        />
      )}
    </div>
  );
}

export default App;