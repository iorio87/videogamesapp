import { useGames } from "../hooks/useGames";
import GameCard from "./GameCard";

function Games() {
  const { data } = useGames();

  return (
    <ul className="text-center grid grid-cols-3 gap-2">
      {data?.map((game) => (        
        <GameCard name={game.name} id={game.id}/>
      ))}
    </ul>
  );
}

export default Games;
