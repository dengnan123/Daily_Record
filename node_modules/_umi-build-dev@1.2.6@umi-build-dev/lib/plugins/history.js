"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(api) {
  const config = api.service.config;

  api._registerConfig(() => {
    return api => {
      return {
        name: 'history',

        validate(val) {
          (0, _assert.default)(['browser', 'hash', 'memory'].includes(val), `history should be browser or hash, but got ${val}`);
        },

        onChange() {
          api.service.restart(
          /* why */
          'Config history Changed');
        }

      };
    };
  });

  api.modifyEntryHistory(memo => {
    if (config.history === 'hash') {
      return `require('history/createHashHistory').default()`;
    } else if (config.history === 'memory') {
      return `require('history/createMemoryHistory').default({ initialEntries: window.g_initialEntries })`;
    }

    return memo;
  });
  api.addHTMLHeadScript((memo, {
    route
  }) => {
    return config.history === 'memory' ? [{
      content: `window.g_initialEntries = ['${route.path}'];`
    }] : [];
  });
}