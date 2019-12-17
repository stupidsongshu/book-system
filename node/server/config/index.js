const path = require('path')

const config = {
  port: 8080,
  baseUrl: 'http://localhost:8888/',
  staticDir: path.join(__dirname, '../../assets'),
  viewDir: path.join(__dirname, '../../views'),
}

export default config
