const express = require('express')
const bodyParser = require("body-parser")
const { config } = require('./config')

/* Import Router */
const moviesRouter = require('./routes/movies')

/* Error Middlewares */
const { logErrors, errorHandler, wrapError } = require('./utils/middlewares/errorHandlers')
const notFoundHandler = require('./utils/middlewares/notFoundHandler')

const app = express()
app.use(bodyParser.json())

moviesRouter(app)
app.use(notFoundHandler)

app.use(logErrors)
app.use(wrapError)
app.use(errorHandler)

app.listen(config.port, () => {
	console.log('Server Running')
})