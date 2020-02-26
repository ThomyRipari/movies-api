class MoviesService {

	// Service Methods

	async getMovies(tags) {
		console.log(tags)
	}

	async createMovie(movie) {
		console.log(movie)
	}

	async updateMovie(id, movie) {
		console.log(id, movie)
	}

	async deleteMovie(id) {
		console.log(id)
	}

	async getMovie(id) {
		console.log(id)
	}
}

module.exports = MoviesService