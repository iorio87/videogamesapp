const { Router } = require('express');
const router = Router();
const { Genre } = require('../db.js');
const { getGenres } = require('./funciones.js');


router.get('/', async(req, res) => { 
    const genres = await getGenres()
    genres.forEach(e => {
        Genre.findOrCreate({
            where: {name: e}
        })
    });
    const allGenres = await Genre.findAll()
    res.send(allGenres)
})

module.exports = router;