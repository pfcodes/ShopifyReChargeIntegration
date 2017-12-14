const app     = require('../app')
const dotenv  = require('dotenv').config()
const mocha   = require('mocha')
const assert  = require('assert')

describe('Application is properly configured.', () => {
  it('RECHARGE_API_KEY is defined in the .env file.', () => {
    assert.ok(process.env.RECHARGE_API_KEY)
  })
})
