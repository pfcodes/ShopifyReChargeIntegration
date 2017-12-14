const dotenv  = require('dotenv')
const chalk   = require('chalk')
const request = require('request')

const debug = {
  checkpoint: (text) => {
    console.log(chalk.blue(`[Checkpoint]: ${text}`))
  },
  log: (text) => {
    console.log(chalk.yellow(`[Log]: ${text}`))
  },
  error: (text) => {
    console.log(chalk.red(`[Error]: ${text}`))
  },
}

