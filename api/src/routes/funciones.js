require('dotenv').config();
const { API_KEY } = process.env;
const { Videogame, Genre } = require('../db.js');
const axios = require('axios');
const { Op } = require('sequelize');

const getApiGames = async () => {

    try {
        let API = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=10`
        const games = []
        for (i = 0; i < 3; i++) {
            const response = await axios.get(API)
            response.data.results.map(e => {
                return games.push({
                    id: e.id,
                    name: e.name,
                    released: e.released,
                    rating: e.rating,
                    image: e.background_image,
                    platforms: e.platforms.map(e => e.platform.name),
                    genres: e.genres.map(e => e.name)
                })
            })
            API = response.data.next
        }
        return games

    } catch (error) {
        console.log(error)
    }

}

const getDBGames = async () => {

    try {
        const DBgames = await Videogame.findAll({
            include: Genre
        })
        const games = DBgames.map(e => {
            return {
                id: e.id,
                name: e.name,
                released: e.released,
                rating: e.rating,
                image: e.image,
                platforms: e.platforms,
                genres: e.genres.map(e => e.name),
                created: e.createdAt
            }
        })
       
        return games
    } catch (error) {
        console.log(error)
    }

   
}

const getAllgames = async () => {
    const apiGames = await getApiGames()
    const dbGames = await getDBGames()    
    const allGames = [...apiGames, ...dbGames]

    return allGames
}

const getGameById = async (id) => {
    let game

    try {
        if (typeof id === 'string' && id.length > 10) {
            const g = await Videogame.findByPk(id, { include: Genre })
            game = {
                name: g.name,
                image: g.image,
                description: g.description,
                released: g.released,
                rating: g.rating,
                platforms: g.platforms.map(e => e),
                genres: g.genres.map(e => e.name)
            }
            return game
        } else {
            const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
            const g = response.data
            game = {
                name: g.name,
                image: g.background_image,
                description: g.description,
                released: g.released,
                rating: g.rating,
                platforms: g.platforms.map(e => e.platform.name),
                genres: g.genres.map(e => e.name)
            }

            return game
        }
    } catch (error) {
        console.log(error)
    }



}

const getGameByName = async (name) => {

    try {
        const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=15&search=${name}`)
        const APIgames = await response.data.results
        const DBGames = await Videogame.findAll({
            include: Genre,
            where: {
                name: {
                    [Op.iLike]: "%" + name + "%"
                }
            }
        })
        const games = [...DBGames, ...APIgames]
        return games
        // return games.slice(0, 15) //lo limito a 15 resultados
    } catch (error) {
        console.log(error)
    }

}

const getGenres = async () => {

    try {
        const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        const genres = response.data.results.map(e => e.name)
        return genres
    } catch (error) {
        console.log(error)
    }

}

module.exports = { getAllgames, getGameById, getGameByName, getGenres };