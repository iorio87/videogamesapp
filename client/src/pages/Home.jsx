import { useGames } from "../hooks/useGames";
import Games from "../components/Games";
import Filters from "../components/Filters";
function Home() {
  const { isLoading } = useGames();
  return (
    <>
    <Filters/>
    {isLoading ? <h1 className="text-center">Loading...</h1> : <Games />}
    </>
  );
}

export default Home;
