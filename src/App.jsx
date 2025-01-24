import { useEffect, useState } from "react";
import Card from "./components/Cards";
import "./App.css";
import Scoreboard from "./components/Scoreboard";

function App() {
  const [cards, setCards] = useState([
    {
      id: 1,
      name: "card1",
      image: "",
      clicked: false,
    },
    {
      id: 2,
      name: "card2",
      image: "",
      clicked: false,
    },
    {
      id: 3,
      name: "card3",
      image: "",
      clicked: false,
    },
  ]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const response = await fetch("https://api.tvmaze.com/shows/713/cast");
        const data = await response.json();
        const filteredData = data.filter(
          (entry) =>
            entry.character.name !== "Narrator" &&
            entry.character.name !== "SpongeBob's Mom"
        );
        const characterCards = filteredData.map((cast, index) => ({
          id: index,
          name: cast.character.name,
          image: cast.character.image.medium,
          clicked: false,
        }));

        const shuffled = shuffleCards(characterCards);

        setCards(shuffled);
      } catch (error) {
        console.error(`Failed to fetch Spongebob data: ${error}`);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  const [score, setScore] = useState(0);

  const [bestScore, setBestScore] = useState(0);

  if (score > bestScore) setBestScore(score);

  const checkWin = () => {
    const unclickedCards = cards.filter((card) => card.clicked === false);
    if (unclickedCards.length < 1) {
      console.log("Congrats, you win!");
    }
  };

  checkWin();

  const handleClick = (id) => {
    const clickedCard = cards.find((card) => card.id === id);

    if (clickedCard.clicked) {
      setScore(0);
      const resetCards = cards.map((card) =>
        card.clicked === true ? { ...card, clicked: false } : card
      );
      const shuffled = shuffleCards(resetCards);
      setCards(shuffled);

      console.log("Game reset");
    } else {
      const updatedCards = cards.map((card) =>
        card.id === id ? { ...card, clicked: true } : card
      );

      const shuffled = shuffleCards(updatedCards);
      setCards(shuffled);
      setScore((prevScore) => prevScore + 1);
    }
  };

  const shuffleCards = (cards) => {
    return [...cards].sort(() => Math.random() - 0.5);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Scoreboard score={score} bestScore={bestScore} />
      <Card cards={cards} handleClick={handleClick} />
    </>
  );
}

export default App;
