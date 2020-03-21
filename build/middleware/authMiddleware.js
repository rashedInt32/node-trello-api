"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _verifyToken = _interopRequireDefault(require("./verifyToken"));

var auth = function auth(req, res, next) {
  (0, _verifyToken["default"])(req, res, next);
};

var _default = auth;
exports["default"] = _default;
//# sourceMappingURL=authMiddleware.js.map