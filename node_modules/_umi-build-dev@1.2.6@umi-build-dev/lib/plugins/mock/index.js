"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _signale = _interopRequireDefault(require("signale"));

var _createMockMiddleware = _interopRequireDefault(require("./createMockMiddleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(api) {
  let errors = [];

  api._beforeServerWithApp(({
    app
  }) => {
    if (process.env.MOCK !== 'none' && process.env.HTTP_MOCK !== 'none') {
      const beforeMiddlewares = api.applyPlugins('addMiddlewareBeforeMock', {
        initialValue: []
      });
      const afterMiddlewares = api.applyPlugins('addMiddlewareAfterMock', {
        initialValue: []
      });
      beforeMiddlewares.forEach(m => app.use(m));
      app.use((0, _createMockMiddleware.default)(api, errors));
      afterMiddlewares.forEach(m => app.use(m));
    }
  });

  api.onDevCompileDone(() => {
    if (errors.length) {
      _signale.default.error(`Mock file parse failed`);

      errors.forEach(e => {
        console.error(e.message);
      });
    }
  });
}