"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const errorHandler = {
  error(app, logger) {
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (e) {
        // console.log(e)
        logger.error(e);
        ctx.status = 500; // ctx.body = '服务器开小差'

        ctx.body = e;
      }

      switch (ctx.status) {
        case 301:
        case 302:
          break;

        case 401:
          break;

        case 404:
          // ctx.redirect('/page/404')
          break;
      }
    });
  }

};
var _default = errorHandler;
exports.default = _default;