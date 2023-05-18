export function getGames() {
  return fetch("http://localhost:3001/videogames")
    .then((res) => res.json())
    .then((games) => {
      return games;
    });
}
