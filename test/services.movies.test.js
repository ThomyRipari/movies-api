const assert = require("assert")
const proxyquire = require("proxyquire")

const { MongoLib, getAllStub, createMovieStub, updateMovieStub } = require("../utils/mocks/mongoLib")

const { moviesMock, filteredMoviesMock, IDsMocks } = require('../utils/mocks/movies')

describe("Movies Service", () => {
	const MoviesService = proxyquire("../services/movies", {
		"../lib/mongo": MongoLib
	})

	const moviesService = new MoviesService()

	describe("getMovies Service method is called", async () => {
		it("Should call getAll MongoLib method", async () => {
			await moviesService.getMovies()

			assert.strictEqual(getAllStub.called, true)
		})

		it("should return filtered movies when getAll MongoLib method is called with Tags", async () => {
			const result = await moviesService.getMovies("Drama")
			const expected = filteredMoviesMock("Drama")

			assert.deepEqual(result, expected)
		})

		it("should return movies when getAll MongoLib method is called", async () => {
			const result = await moviesService.getMovies()
			const expected = moviesMock

			assert.deepEqual(result, expected)
		})
	})

	describe("createMovie Service method is called", async () => {
		it("Should call create MongoLib method", async () => {
			await moviesService.createMovie(moviesMock[0])

			assert.strictEqual(createMovieStub.called, true)

		})

		it("should return created movie when create MongoLib method is called", async () => {
			const result = await moviesService.createMovie(moviesMock[0])
			
			assert.deepEqual(result, IDsMocks[0])
		})
	})

	describe("updateMovie Service method is called", async () => {
		it("Should call update MongoLib method", async () => {
			await moviesService.updateMovie(IDsMocks[1], moviesMock[1])

			assert.strictEqual(updateMovieStub.called, true)
		})

		it("should return updated movie id when update MongoLib method is called", async () => {
			const result = await moviesService.updateMovie(IDsMocks[1], moviesMock[1])

			assert.deepEqual(result, IDsMocks[1])
		})
	})
})