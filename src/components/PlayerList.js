import React from 'react';

const PlayerList = ({ players, onScoreChange }) => {
  return (
    <div className="players-section">
      <h2 style={{textAlign: 'center', marginBottom: '20px', color: '#ffd700'}}>Игроки</h2>
      <div className="players-grid">
        {players.map(player => (
          <div key={player.id} className="player-card">
            <div className="player-name">{player.name}</div>
            <div className="player-score">{player.score}</div>
            <div className="score-buttons">
              <button className="score-button" onClick={() => onScoreChange(player.id, 100)}>
                +100
              </button>
              <button className="score-button" onClick={() => onScoreChange(player.id, -100)}>
                -100
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;