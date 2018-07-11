const env = process.env.APP_ENV

const API = {
}

if (env === 'local') {
  API.domain = 'localhost://'
  API.corpId = ''
} else if (env === 'uat') {
  API.domain = 'https://uat'
} else if (env === 'prod') {
  API.domain = 'https://prod'
}

export default API
