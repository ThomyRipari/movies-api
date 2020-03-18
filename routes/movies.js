const express = require('express')

/* Service */
const MoviesService = require('../services/movies')

/* Req Schema Validators */
const { movieIdSchema, createMovieSchema, updateMovieSchema } = require("../utils/schemas/movies")

const validationHandler = require("../utils/middlewares/validationHandler")

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
				message: 'Movies Listed'
			})
		}

		catch(err) {
			next(err)
		}
	})

	router.get('/:id', validationHandler({id: movieIdSchema}, "params"), async (req, res, next) => {
		const { id } = req.params

		try {
			const movie = await Movies.getMovie(id)

			res.status(200).json({
				data: movie,
				message: 'Movie Retrieved'
			})
		}

		catch(err) {
			next(err)
		}
	})

	router.post('/', validationHandler(createMovieSchema), async (req, res, next) => {
		const { body: movie } = req

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

	router.patch(
		'/:id', 
		validationHandler({id: movieIdSchema}, "params"), 
		validationHandler(updateMovieSchema), 
		async (req, res, next) => {

		const { id } = req.params
		const { body: movie } = req

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

	router.delete('/:id', validationHandler({id: movieIdSchema}, "params"), async (req, res, next) => {
		const { id } = req.params

		try {
			const movie_deleted = await Movies.deleteMovie(id)

			res.status(200).json({
				data: movie_deleted,
				message: 'Movie Deleted'
			})
		}

		catch(err) {
			next(err)
		}
	})

}

module.exports = moviesRouter