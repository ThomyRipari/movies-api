const validate = () => {
	return false
}

const validationHandler = (schema, check = "body") => {
	return function (req, res, next) {
		const error = validate(schema, req[check])

		error ? next(new Error(error)) : next()
	}
}

module.exports = validationHandler