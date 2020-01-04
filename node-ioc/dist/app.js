"use strict";

var _koa = _interopRequireDefault(require("koa"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _koaSwig = _interopRequireDefault(require("koa-swig"));

var _co = require("co");

var _log4js = _interopRequireDefault(require("log4js"));

var _awilix = require("awilix");

var _awilixKoa = require("awilix-koa");

var _error = _interopRequireDefault(require("./middlewares/error"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const Koa = require('koa')
const app = new _koa.default(); // 1. 创建容器

const container = (0, _awilix.createContainer)(); // 2. 把controller需要的service注册进容器

container.loadModules([__dirname + ['/services/*.js']], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: _awilix.Lifetime.SCOPED
  }
}); // 3. 合并容器与路由

app.use((0, _awilixKoa.scopePerRequest)(container)); // 日志配置

_log4js.default.configure({
  appenders: {
    cheese: {
      type: 'file',
      filename: __dirname + '/logs/error.log'
    }
  },
  categories: {
    default: {
      appenders: ['cheese'],
      level: 'error'
    }
  }
}); // 静态服务


app.use((0, _koaStatic.default)(_config.default.staticDir, {
  // maxage: 24 * 60 * 60 * 1000
  maxage: 0
})); // 模板引擎

app.context.render = (0, _co.wrap)((0, _koaSwig.default)({
  root: _config.default.viewDir,
  autoescape: true,
  // 转义字符防止xss攻击
  cache: 'memory',
  // disable, set to false
  ext: 'html',
  writeBody: false
}));

const logger = _log4js.default.getLogger('cheese');

_error.default.error(app, logger); // 4. 加载所有路由


app.use((0, _awilixKoa.loadControllers)(__dirname + '/controllers/*.js'));
app.listen(_config.default.port, () => {
  console.log(`Server is listening on port: ${_config.default.port}`);
});