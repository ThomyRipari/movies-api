const express = require('express')
const bodyParser = require("body-parser")
const { config } = require('./config')

/* Import Router */
const moviesRouter = require('./routes/movies')

/* Error Middlewares */
const { logErrors, errorHandler } = require('./utils/middlewares/errorHandlers')

const app = express()
app.use(bodyParser.json())

moviesRouter(app)

app.use(logErrors)
app.use(errorHandler)

app.listen(config.port, () => {
	console.log('Server Running')
})