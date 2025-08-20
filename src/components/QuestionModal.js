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
      return (
        <div className="media-content">
          <img src={question.media} alt="Вопрос" />
        </div>
      );
    }
    if (question.type === 'audio' && question.media) {
      return (
        <div className="media-content">
          <audio controls src={question.media} />
        </div>
      );
    }
    if (question.type === 'video' && question.media) {
      return (
        <div className="media-content">
          <video controls src={question.media} />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="question-modal" onClick={e => e.stopPropagation()}>
        <div className="question-price">Вопрос за {question.price} очков</div>
        
        {question.special && !showAnswer && (
          <div className="special-notice">
            ⚡ СПЕЦИАЛЬНЫЙ ВОПРОС ⚡
          </div>
        )}

        {question.special && showAnswer && (
          <div className="special-notice">
            ⚡ {question.special.toUpperCase()} ⚡
          </div>
        )}
        
        <div className="question-text">{question.text}</div>
        
        {renderMedia()}

        {showAnswer ? (
          <>
            <div className="answer-text">
              <strong>Ответ:</strong> {question.answer}
            </div>
            
            <div style={{margin: '25px 0'}}>
              <h3 style={{textAlign: 'center', marginBottom: '20px', color: '#64ffda'}}>
                Выберите игрока:
              </h3>
              <div className="players-grid">
                {players.map(player => (
                  <div
                    key={player.id}
                    className={`player-card ${selectedPlayer === player.id ? 'selected' : ''}`}
                    style={{
                      border: selectedPlayer === player.id ? '2px solid #64ffda' : '1px solid #8892b0',
                      transform: selectedPlayer === player.id ? 'translateY(-2px)' : 'none'
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
              style={{
                background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
                color: 'white',
                border: '1px solid #6a11cb'
              }}
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