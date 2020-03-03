const joi = require('@hapi/joi')
joi.objectId = require('joi-objectid')(joi)

const movieIdSchema = joi.objectId()
const movieTitle = joi.string().max(80)
const movieYear = joi.number().min(1888).max(2077)
const movieCover = joi.string().uri()
const movieDescription = joi.string().max(300)
const movieDuration = joi.number().min(1).max(300)
const movieContentRating = joi.string().max(5)
const movieSource = joi.string().uri()
const movieTags = joi.array().items(joi.string().max(50))

const createMovieSchema = {
	title: movieTitle.required(),
	year: movieYear.required(),
	cover: movieCover.required(),
	description: movieDescription.required(),
	duration: movieDuration.required(),
	contentRating: movieContentRating.required(),
	source: movieSource.required(),
	tags: movieTags
}

const updateMovieSchema = {
	title: movieTitle,
	year: movieYear,
	cover: movieCover,
	description: movieDescription,
	duration: movieDuration,
	contentRating: movieContentRating,
	source: movieSource,
	tags: movieTags	
}

module.exports = { movieIdSchema, createMovieSchema, updateMovieSchema }