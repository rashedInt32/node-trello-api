'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _verifyToken = require('./verifyToken');

var _verifyToken2 = _interopRequireDefault(_verifyToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = function auth(req, res, next) {
  (0, _verifyToken2.default)(req, res, next);
};

exports.default = auth;