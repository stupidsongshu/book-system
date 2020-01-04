const path = require('path')
const _ = require('lodash')

let config = {
  port: 8080,
  baseUrl: 'http://localhost:8888/',
  // staticDir: path.join(__dirname, '../../assets'),
  // viewDir: path.join(__dirname, '../../web', 'views'),
  staticDir: path.join(__dirname, '../assets'),
  viewDir: path.join(__dirname, '../views'),
}

if (false) { // will be removed by gulp-rollup in production build
  console.log('gulp-rollup tree-shaking')
}

if (process.env.NODE_ENV === 'development') { // will be removed by @rollup/plugin-replace in production build
  const localConfig = {
    port: 8080,
  }
  config = _.extend(config, localConfig)
} else if (process.env.NODE_ENV === 'production') {
  const prodConfig = {
    port: 80,
  }
  config = _.extend(config, prodConfig)
}

export default config
