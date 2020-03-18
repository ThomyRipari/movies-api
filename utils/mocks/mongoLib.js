const sinon = require("sinon")

const { moviesMock, filteredMoviesMock, IDsMocks } = require("./movies")

const getAllStub = sinon.stub()

getAllStub.withArgs('movies').resolves(moviesMock)

const tagsQuery = { tags: {$in: 'Drama'} }
getAllStub.withArgs('movies', tagsQuery).resolves(filteredMoviesMock('Drama'))

const createMovieStub = sinon.stub()
createMovieStub.resolves(IDsMocks[0])

const updateMovieStub = sinon.stub()
updateMovieStub.withArgs('movies', IDsMocks[1], moviesMock[1]).resolves(IDsMocks[1])


class MongoLib {
	getAll(collection, query) {
		return getAllStub(collection, query)
	}

	create(collection, data) {
		return createMovieStub(collection, data)
	}

	update(collection, id, movie) {
		return updateMovieStub(collection, id, movie)
	}

}

module.exports = {
	MongoLib,
	getAllStub,
	createMovieStub,
	updateMovieStub
}