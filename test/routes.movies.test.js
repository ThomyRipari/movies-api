const assert = require('assert')
const proxyquire = require('proxyquire')

/* Mocks */
const { moviesMock, MoviesServiceMock, filteredMoviesMock, IDsMocks } = require('../utils/mocks/movies')

/* Test Server */
const testServer = require('../utils/testServer')

describe('Routes - Movies', () => {
	const routes = proxyquire('../routes/movies', {
		'../services/movies': MoviesServiceMock
	})

	const request = testServer(routes)

	describe('GET /api/movies', () => {
		it('Response status should be 200', (done) => {
			request.get('/api/movies').expect(200, done)
		})

		it('should respond with the movies list', (done) => {
			request.get('/api/movies').end((err, res) => {
				assert.deepEqual(res.body, {
					data: moviesMock,
					message: 'Movies Listed'
				})
			})

			done()
		})

		it('should respond with the movies filtered by tags', (done) => {
			const tags = 'Action|Adventure'
			request.get('/api/movies').send({tags: tags}).end((err, res) => {
				assert.deepEqual(res.body, {
					data: filteredMoviesMock(tags),
					message: 'Movies Listed'
				})
			})

			done()
		})
	})

	describe('POST /api/movies', () => {
		it('should respond with the created movie id', (done) => {
			request.post('/api/movies').send({...moviesMock[0]}).end((err , res) => {
				assert.deepEqual(res.body, {
					data: IDsMocks[0],
					message: 'Movie Created'
				})
			})

			done()
		})
	})
})