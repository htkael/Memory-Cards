function Card({ cards, handleClick }) {
  const cardDisplay = cards.map((entry, index) => {
    return (
      <button
        className="card"
        key={index}
        onClick={() => {
          handleClick(entry.id);
        }}
      >
        <img src={entry.image} alt={entry.name} />
        <div>{entry.name}</div>
      </button>
    );
  });

  return <div className="cards">{cardDisplay}</div>;
}

export default Card;
