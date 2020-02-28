/* Import Mongo Lib */
const MongoLib = require("../lib/mongo")

class MoviesService {
	constructor() {
		this.collection = 'movies'
		this.mongoDB = new MongoLib()
	}

	// Service Methods

	async getMovies(tags) {
		const query = tags && { tags: {$in: tags} }
		const movies = await this.mongoDB.getAll(this.collection, query)
		return movies || []
	}

	async createMovie(movie) {
		const inserted_movie_id = await this.mongoDB.create(this.collection, movie)
		return inserted_movie_id || ""
	}

	async updateMovie(id, movie) {
		const updated_movie_id = await this.mongoDB.update(this.collection, id, movie)
		return updated_movie_id || ""
	}

	async deleteMovie(id) {
		const deleted_movie_id = await this.mongoDB.delete(this.collection, id)
		return deleted_movie_id || ""
	}

	async getMovie(id) {
		const movie = await this.mongoDB.get(this.collection, id)
		return movie || {}
	}
}

module.exports = MoviesService