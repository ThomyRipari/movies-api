const assert = require('assert')

const resMessages = require('../utils/resMessages')

describe('Res Messages Utils Tests', () => {
	it('Should be return res message (get movies)', () => {
		const res_message = resMessages('Movies', 'Listed')

		assert.equal('Movies Listed', res_message)
	})
})