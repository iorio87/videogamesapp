import { useGames } from "../hooks/useGames";
import GameCard from "./GameCard";

function Games() {
  const { data } = useGames();

  return (
    <ul className="text-center grid grid-cols-3 gap-2">
      {data?.map((game) => (
        //<li key={game.id}>{game.name}</li>
        <GameCard name={game.name}/>
      ))}
    </ul>
  );
}

export default Games;
