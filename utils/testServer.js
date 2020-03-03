const express = require('express')
const supertest = require('supertest')
const bodyParser = require("body-parser")

function testServer(routes) {
	const app = express()
	app.use(bodyParser.json())

	routes(app)

	return supertest(app)
}

module.exports = testServer