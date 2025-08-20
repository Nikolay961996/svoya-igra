import React from 'react';

const GameBoard = ({ themes, usedQuestions, onQuestionSelect }) => {
  return (
    <div className="game-board">
      {themes.map(theme => (
        <div key={theme.id} className="theme-row">
          <div className="theme-title">{theme.name}</div>
          {theme.questions.map(question => {
            const isUsed = usedQuestions.includes(question.id);
            
            return (
              <div
                key={question.id}
                className={`question-cell ${isUsed ? 'used' : ''}`}
                onClick={!isUsed ? () => onQuestionSelect(question) : undefined}
              >
                {isUsed ? '' : question.price}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;