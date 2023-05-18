const { Router } = require("express");
const router = Router();
const { getAllgames, getGameByName } = require("./funciones.js");

router.get("/", async (req, res) => {
  const { name } = req.query;
  const games = await getAllgames();
  if (name) {
    const filter = await getGameByName(name);
    const game = filter.map((e) => {
      return {
        name: e.name,
        image: e.background_image ? e.background_image : e.image,
        id: e.id,
        genres: e.genres.map((e) => e.name),
        rating: e.rating,
      };
    });
    filter.length
      ? res.send(game)
      : res.status(404).send("No existen juegos con el nombre ingresado");
  } else {
    res.send(games);
  }
});

module.exports = router;
