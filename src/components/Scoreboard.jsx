function Scoreboard({ score, bestScore }) {
  return (
    <div className="scores">
      <div className="score">Score: {score}</div>
      <div className="bestScore">Best Score: {bestScore}</div>
    </div>
  );
}

export default Scoreboard;
