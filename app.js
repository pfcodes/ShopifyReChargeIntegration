// TODO: Implement request-promise-native
const dotenv  = require('dotenv').config()
const request = require('request-promise-native')
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

const App = {

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
    const options = App.baseOptions

    // Mutate the options based on the request type
    switch (action) {
      case 'getStoreInfo':
        options.method = 'GET'
      break

      case 'getUserByShopifyId':
        options.method = 'GET'
        options.url += `/customers?shopify_customer_id=
                        ${parameters.shopify_customer_id}`
      break

      default:
        reject(Error('Unknown or missing request method.'))
      break
    }

    // Make the request
    debug.checkpoint(`About to make a '${action}' request.`)

    const req = request(options, (error, response, body) => {
      if (error) {
        return reject(error)
      }
      if (response.statusCode !== 200) {
        return reject(Error(`Received a NOT OK status code of: 
                      ${response.statusCode}`))
      }

return resolve(body)
    })
  }),

  // LAMBDA Handler
  handler: (event, context, callback) => {
    let method = event.method;
    let options = event.options;
    
    App.makeRequest(method, options)
      .then((responseBody) => {
        let customer = JSON.parse(responseBody).customers[0]
        
        for (let i = 0; i < Object.keys(customer).length; i++) {
          let currentKey = Object.keys(customer)[i]
          debug.info(`${currentKey}: ${customer[currentKey]}`)
        }
      })
      .catch((err) => debug.error(err))
  }
}

// Create Subscription (High Priority)

// List Subscriptions (High Priority)

// Update Items in Subscription Box (High Priority)

// Purchase History (Low Priority)


module.exports = App