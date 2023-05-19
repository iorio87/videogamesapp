import { useGames } from "../hooks/useGames";

function Games() {
  const { data } = useGames();

  return (
    <ul className="text-center">
      {data?.map((game) => (
        <li key={game.id}>{game.name}</li>
      ))}
    </ul>
  );
}

export default Games;
