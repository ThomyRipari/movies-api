const express = require('express')
const bodyParser = require("body-parser")
const { config } = require('./config')

/* Import Router */
const moviesRouter = require('./routes/movies')

const app = express()
app.use(bodyParser.json())

moviesRouter(app)

app.listen(config.port, () => {
	console.log('Server Running')
})