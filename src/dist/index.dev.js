"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

require("./index.css");

var _reportWebVitals = _interopRequireDefault(require("./reportWebVitals"));

var _App = _interopRequireDefault(require("./App.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_reactDom["default"].render(_App["default"], document.getElementById('root')); // If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


(0, _reportWebVitals["default"])();