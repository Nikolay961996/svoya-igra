import React, { useState } from 'react';

const QuestionModal = ({ question, players, onAnswer, onClose }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handleAnswer = (isCorrect) => {
    if (isCorrect && selectedPlayer) {
      onAnswer(selectedPlayer, question.price, isCorrect);
    } else if (!isCorrect) {
      onAnswer(null, question.price, isCorrect);
    }
    onClose();
  };

  const renderMedia = () => {
    if (question.type === 'image' && question.media) {
      return <img src={question.media} alt="Вопрос" />;
    }
    if (question.type === 'audio' && question.media) {
      return <audio controls src={question.media} />;
    }
    if (question.type === 'video' && question.media) {
      return <video controls src={question.media} />;
    }
    return null;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="question-modal" onClick={e => e.stopPropagation()}>
        <div className="question-price">Вопрос за {question.price} очков</div>
        {question.special && (
          <div className="special-notice" style={{textAlign: 'center', color: '#ff6b6b', marginBottom: '20px'}}>
            ⚡ {question.special.toUpperCase()} ⚡
          </div>
        )}
        
        <div className="question-text">{question.text}</div>
        
        {renderMedia() && (
          <div className="media-content">
            {renderMedia()}
          </div>
        )}

        {showAnswer ? (
          <>
            <div className="answer-text" style={{textAlign: 'center', fontSize: '1.3rem', margin: '20px 0'}}>
              <strong>Ответ:</strong> {question.answer}
            </div>
            
            <div style={{margin: '20px 0'}}>
              <h3 style={{textAlign: 'center', marginBottom: '15px'}}>Выберите игрока:</h3>
              <div className="players-grid">
                {players.map(player => (
                  <div
                    key={player.id}
                    className={`player-card ${selectedPlayer === player.id ? 'selected' : ''}`}
                    style={{
                      border: selectedPlayer === player.id ? '2px solid #ffd700' : 'none',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedPlayer(player.id)}
                  >
                    <div className="player-name">{player.name}</div>
                    <div className="player-score">{player.score}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="answer-buttons">
              <button
                className="answer-button correct"
                onClick={() => handleAnswer(true)}
                disabled={!selectedPlayer}
              >
                Верно (+{question.price})
              </button>
              <button
                className="answer-button incorrect"
                onClick={() => handleAnswer(false)}
              >
                Неверно
              </button>
            </div>
          </>
        ) : (
          <div style={{textAlign: 'center'}}>
            <button
              className="answer-button"
              style={{background: '#9c27b0', color: 'white'}}
              onClick={() => setShowAnswer(true)}
            >
              Показать ответ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionModal;