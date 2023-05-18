import { useGames } from "./hooks/useGames";

function App() {
  const { data } = useGames();
  return (
    <main className="bg-gray-900 text-white">
      
        <ul className="text-center">
          {data?.map((game) => (
            <li key={game.id}>{game.name}</li>
          ))}
        </ul>
      
    </main>
  );
}

export default App;
