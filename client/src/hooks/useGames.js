import { useEffect, useState } from "react";
import { getGames } from "../services/games";
import {useQuery} from '@tanstack/react-query'


export function useGames() {

  const {data, error, isLoading}= useQuery(['games'], getGames)
    // const [games, setGames] = useState([]);
  
    // useEffect(() => {
    //   getGames().then((newGames) => setGames(newGames));
    // }, []);
    console.log(data);
  
    return {data, isLoading}
  }