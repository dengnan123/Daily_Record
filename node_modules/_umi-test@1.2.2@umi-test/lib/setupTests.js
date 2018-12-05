"use strict";

var _jsdom = require("jsdom");

var _enzyme = _interopRequireDefault(require("enzyme"));

var _enzymeAdapterReact = _interopRequireDefault(require("enzyme-adapter-react-16"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_enzyme.default.configure({
  adapter: new _enzymeAdapterReact.default()
}); // fixed jsdom miss


const documentHTML = '<!doctype html><html><body><div id="root"></div></body></html>';
const dom = new _jsdom.JSDOM(documentHTML);
global.window = dom.window;
global.document = dom.window.document;
global.navigator = global.window.navigator;