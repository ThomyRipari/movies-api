const sinon = require("sinon")

const { moviesMock, filteredMoviesMock } = require("./movies")

const getAllStub = sinon.stub()

getAllStub.withArgs('movies').resolves(moviesMock)

const tagsQuery = { tags: {$in: 'Drama'} }
getAllStub.withArgs('movies', tagsQuery).resolves(filteredMoviesMock('Drama'))

const createMovieStub = sinon.stub()
createMovieStub.resolves(moviesMock[0])


class MongoLib {
	getAll(collection, query) {
		return getAllStub(collection, query)
	}

	create(collection, data) {
		return createMovieStub(collection, data)
	}
}

module.exports = {
	MongoLib,
	getAllStub,
	createMovieStub
}