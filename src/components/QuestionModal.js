import React, { useState } from 'react';

const QuestionModal = ({ question, players, onAnswer, onClose }) => {
  const [showQuestion, setShowQuestion] = useState(false);
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

  const renderMedia = (mediaUrl, mediaType, isAnswer = false) => {
    if (!mediaUrl) return null;

    if (mediaType === 'image' || (!mediaType && mediaUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i))) {
      return (
        <div className={`media-content ${isAnswer ? 'answer-media' : ''}`}>
          <img src={mediaUrl} alt={isAnswer ? "Ответ" : "Вопрос"} />
        </div>
      );
    }
    if (mediaType === 'audio' || mediaUrl.match(/\.(mp3|wav|ogg)$/i)) {
      return (
        <div className={`media-content ${isAnswer ? 'answer-media' : ''}`}>
          <audio controls src={mediaUrl} />
        </div>
      );
    }
    if (mediaType === 'video' || mediaUrl.match(/\.(mp4|webm|ogg)$/i)) {
      return (
        <div className={`media-content ${isAnswer ? 'answer-media' : ''}`}>
          <video controls src={mediaUrl} />
        </div>
      );
    }
    return null;
  };

  const renderContent = () => {
    // Первый экран - тип специального вопроса
    if (question.special && !showQuestion) {
      return (
        <>
          <div className="special-notice">
            ⚡ {question.special.toUpperCase()} ⚡
          </div>
          <div className="question-price">Вопрос за {question.price} очков</div>
          <div style={{textAlign: 'center', margin: '30px 0'}}>
            <button
              className="answer-button"
              style={{
                background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
                color: 'white',
                border: '1px solid #6a11cb',
                fontSize: '1.4rem',
                padding: '20px 40px'
              }}
              onClick={() => setShowQuestion(true)}
            >
              Показать вопрос
            </button>
          </div>
        </>
      );
    }

    // Второй экран - сам вопрос
    if (!showAnswer) {
      return (
        <>
          {question.special && (
            <div className="special-notice">
              ⚡ {question.special.toUpperCase()} ⚡
            </div>
          )}
          <div className="question-price">Вопрос за {question.price} очков</div>
          <div className="question-text">{question.text}</div>
          {renderMedia(question.media, question.type)}
          <div style={{textAlign: 'center', marginTop: '30px'}}>
            <button
              className="answer-button"
              style={{
                background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
                color: 'white',
                border: '1px solid #6a11cb',
                fontSize: '1.4rem',
                padding: '20px 40px'
              }}
              onClick={() => setShowAnswer(true)}
            >
              Показать ответ
            </button>
          </div>
        </>
      );
    }

    // Третий экран - ответ
    return (
      <>
        {question.special && (
          <div className="special-notice">
            ⚡ {question.special.toUpperCase()} ⚡
          </div>
        )}
        <div className="question-price">Вопрос за {question.price} очков</div>
        <div className="question-text">{question.text}</div>
        {renderMedia(question.media, question.type)}
        
        <div className="answer-section">
          <div className="answer-text">
            <strong>Ответ:</strong> {question.answer}
          </div>
          {renderMedia(question.answerMedia, question.answerMediaType, true)}
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
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="question-modal" onClick={e => e.stopPropagation()}>
        {renderContent()}
      </div>
    </div>
  );
};

export default QuestionModal;