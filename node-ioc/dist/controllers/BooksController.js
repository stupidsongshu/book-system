"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _awilixKoa = require("awilix-koa");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

let BooksController = (_dec = (0, _awilixKoa.route)('/books'), _dec2 = (0, _awilixKoa.route)('/index'), _dec3 = (0, _awilixKoa.GET)(), _dec4 = (0, _awilixKoa.route)('/list'), _dec5 = (0, _awilixKoa.GET)(), _dec6 = (0, _awilixKoa.route)('/create'), _dec7 = (0, _awilixKoa.GET)(), _dec(_class = (_class2 = class BooksController {
  constructor({
    booksServices
  }) {
    this.booksServices = booksServices;
  }

  async actionIndex(ctx, next) {
    const result = await this.booksServices.getData({
      url: 'book/index'
    });
    console.log('books list===', result);
    const html = await ctx.render('books/pages/index', {
      data: result.data.data
    });
    ctx.body = html;
  }

  async actionList(ctx, next) {
    // const result = await books.getData({
    //   url: 'book/index'
    // })
    // console.log('books list===', result)
    const html = await ctx.render('books/pages/list', {
      data: 'result.data list'
    });
    ctx.body = html;
  }

  async actionCreate(ctx, next) {
    // const result = await books.getData({
    //   url: 'book/index'
    // })
    // console.log('books list===', result)
    const html = await ctx.render('books/pages/create', {
      data: 'result.data create'
    });
    ctx.body = html;
  }

}, (_applyDecoratedDescriptor(_class2.prototype, "actionIndex", [_dec2, _dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "actionIndex"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "actionList", [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "actionList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "actionCreate", [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "actionCreate"), _class2.prototype)), _class2)) || _class);
exports.default = BooksController;