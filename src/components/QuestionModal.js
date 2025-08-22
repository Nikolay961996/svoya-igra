import React, { useState } from 'react';

// Импортируем медиафайлы
import monaLisa from '../assets/images/mona-lisa.jpg';
import italyMap from '../assets/images/italy-map.png';
import peterImage from '../assets/images/history/peter.jpg';
import battleImage from '../assets/images/history/battle.jpg';
import musicAudio from '../assets/audio/music.mp3';
import fragmentVideo from '../assets/video/fragment.mp4';

const QuestionModal = ({ question, players, onAnswer, onClose }) => {
  const [showQuestion, setShowQuestion] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // Функция для получения медиафайла по пути
  const getMediaByPath = (path) => {
    const mediaMap = {
      '../assets/images/mona-lisa.jpg': monaLisa,
      '../assets/images/italy-map.png': italyMap,
      '../assets/images/history/peter.jpg': peterImage,
      '../assets/images/history/battle.jpg': battleImage,
      '../assets/audio/music.mp3': musicAudio,
      '../assets/video/fragment.mp4': fragmentVideo,
    };
    return mediaMap[path] || path;
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect && selectedPlayer) {
      onAnswer(selectedPlayer, question.price, isCorrect);
    } else if (!isCorrect) {
      onAnswer(null, question.price, isCorrect);
    }
    onClose();
  };

  const renderMedia = () => {
    if (!question.media) return null;

    const mediaSource = getMediaByPath(question.media);

    if (question.type === 'image') {
      return (
        <div className="media-content">
          <img src={mediaSource} alt="Вопрос" />
        </div>
      );
    }
    if (question.type === 'audio') {
      return (
        <div className="media-content">
          <audio controls src={mediaSource} />
        </div>
      );
    }
    if (question.type === 'video') {
      return (
        <div className="media-content">
          <video controls src={mediaSource} />
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
          {renderMedia()}
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
        {renderMedia()}
        
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