const express = require('express')

/* Service */
const MoviesService = require('../services/movies')

function moviesRouter(app) {
	const router = express.Router()
	app.use('/api/movies', router)

	const Movies = new MoviesService()

	router.get('/', async (req, res, next) => {
		const { tags } = req.body

		try {
			const movies = await Movies.getMovies(tags)

			res.status(200).json({
				data: movies,
				message: 'List of Movies'
			})
		}

		catch(err) {
			next(err)
		}
	})

	router.post('/', async (req, res, next) => {
		const { movie } = req.body

		try {
			const movie_id = await Movies.createMovie(movie)

			res.status(201).json({
				data: movie_id,
				message: 'Movie Created'
			})
		}

		catch(err) {
			next(err)
		}

	})

	router.put('/:id', async (req, res, next) => {
		const { id } = req.params
		const { movie } = req.body

		try {
			const movie_id = await Movies.updateMovie(id, movie)

			res.status(200).json({
				data: movie_id,
				message: 'Movie Updated'
			})
		}

		catch(err) {
			next(err)
		}
	})

}

module.exports = moviesRouter