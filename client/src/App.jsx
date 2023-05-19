import Games from "./components/Games";
import { useGames } from "./hooks/useGames";

function App() {
  const { isLoading } = useGames();
  return (
    <main className="bg-gray-900 text-white min-h-screen">
      {isLoading ? <h1 className="text-center">Loading...</h1> : <Games />}
    </main>
  );
}

export default App;
