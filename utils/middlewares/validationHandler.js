const boom = require('@hapi/boom')
const joi = require('@hapi/joi')

const validate = (schema, dataToCheck) => {
	const { error } = joi.object(schema).validate(dataToCheck)

	return error
}

const validationHandler = (schema, check = "body") => {
	return function (req, res, next) {
		const error = validate(schema, req[check])

		error ? next(boom.badRequest(error)) : next()
	}
}

module.exports = validationHandler