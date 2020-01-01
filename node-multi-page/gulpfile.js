const { src, dest, series } = require('gulp')
const watch = require('gulp-watch')
const babel = require('gulp-babel')
const rollup = require('gulp-rollup')
const replace = require('@rollup/plugin-replace')
const colors = require('colors')

const NODE_ENV = process.env.NODE_ENV
console.log(colors.cyan('gulp编译环境：'), colors.yellow(NODE_ENV))

const entries = './src/server/**/*.js'

function serverDev() {
  return watch(entries, { ignoreInitial: false })
    .pipe(babel({
      // presets: ['@babel/env'] // @babel/env 针对客户端代码转译
      // @babel/plugin-transform-modules-commonjs: This plugin transforms ES2015 modules to CommonJS.
      plugins: ['@babel/plugin-transform-modules-commonjs']
    }))
    .pipe(dest('dist'))
}

function serverProd() {
  return src(entries)
    .pipe(babel({
      // presets: ['@babel/env'] // @babel/env 针对客户端代码转译
      // @babel/plugin-transform-modules-commonjs: This plugin transforms ES2015 modules to CommonJS.
      plugins: ['@babel/plugin-transform-modules-commonjs']
    }))
    // transform the files here.
    .pipe(rollup({
      // any option supported by Rollup can be set here.
      input: './src/server/config/index.js',
      output: {
        format: 'cjs' // 'amd', 'cjs', 'es', 'iife' or 'umd'
      },
      plugins: [replace({ 'process.env.NODE_ENV': '"production"' })]
    }))
    .pipe(dest('dist'))
}

let build = null
switch(NODE_ENV) {
  case 'development':
    build = series(serverDev)
    break
  case 'production':
    build = series(serverProd)
    break
  default:
    build = series(serverProd)
    break
}
exports.default = build
