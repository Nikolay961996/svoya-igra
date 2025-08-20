import React from 'react';

const Scoreboard = ({ players, onClose }) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="scoreboard-modal" onClick={e => e.stopPropagation()}>
        <h2 className="scoreboard-title">🏆 Рейтинг игроков 🏆</h2>
        <ul className="scoreboard-list">
          {sortedPlayers.map((player, index) => (
            <li key={player.id} className="scoreboard-item">
              <span className="scoreboard-rank" style={{width: '30px', fontWeight: 'bold'}}>
                {index + 1}.
              </span>
              <span className="scoreboard-name">{player.name}</span>
              <span className="scoreboard-score">{player.score}</span>
            </li>
          ))}
        </ul>
        <div style={{textAlign: 'center', marginTop: '20px'}}>
          <button className="control-button" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;