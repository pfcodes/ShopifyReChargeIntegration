// TODO: Implement request-promise-native
const dotenv  = require('dotenv').config()
const request = require('request')
const chalk   = require('chalk')

const RECHARGE_API_ENDPOINT = 'https://api.rechargeapps.com'
const RECHARGE_API_KEY = process.env.RECHARGE_API_KEY

const debug = {
  checkpoint: (text) => {
    console.log(chalk.blue(`[Checkpoint]: ${text}`))
  },
  warn: (text) => {
    console.log(chalk.yellowBright(`[Warning]: ${text}`))
  },
  log: (text) => {
    console.log(chalk.yellow(`[Log]: ${text}`))
  },
  error: (text) => {
    console.log(chalk.red(`[Error]: ${text}`))
  },
  info: (text) => {
    console.log(chalk.cyanBright(`[Info]: ${text}`))
  }
}

const app = {

  baseOptions: {
    method: '',
    url: RECHARGE_API_ENDPOINT,
    headers: {
      'X-Recharge-Access-Token': RECHARGE_API_KEY,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    data: {}
  },

  makeRequest: (action, parameters) => new Promise((resolve, reject) => {
    let options = app.baseOptions

    // Mutate the options based on the request type
    switch (action) {
      case "getStoreInfo":
        options.method = 'GET'
      break

      case "getUserByShopifyId":
        options.method = 'GET'
        options.url += `/customers?shopify_customer_id=${parameters.shopify_customer_id}`
      break

      default:
        return reject('Unknown or missing request method.')
      break
    }

    // Make the request
    debug.checkpoint(`About to make a '${action}' request.`)

    let req = request(options, (error, response, body) => {
      if (error) {
        return reject(error)
      }
      debug.checkpoint(`Received a response from the server: ${response.statusCode}`)
      return resolve(body)
    })
  })
}

app.makeRequest('getUserByShopifyId', {shopify_customer_id: 90792919046})
  .then((responseBody) => {

    

  }).catch((err) => debug.error(err) )

module.exports = app