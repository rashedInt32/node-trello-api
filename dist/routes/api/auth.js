"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bcryptjs = require("bcryptjs");

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _userSchema = require("../../models/userSchema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var _req$body, email, password, _validateAuthUser, error, user, isValidPassword, token;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;

            // Validate input value to match schema

            _validateAuthUser = (0, _userSchema.validateAuthUser)(req.body), error = _validateAuthUser.error;

            if (!error) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.status(400).send({
              error: true,
              msg: error.details[0].message
            }));

          case 4:
            _context.next = 6;
            return _userSchema.User.findOne({ email: email });

          case 6:
            user = _context.sent;

            if (user) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.status(400).send({
              error: true,
              msg: 'Email Not found',
              token: ""
            }));

          case 9:
            _context.next = 11;
            return _bcryptjs2.default.compare(password, user.password);

          case 11:
            isValidPassword = _context.sent;

            if (isValidPassword) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", res.status(400).send({
              error: true,
              msg: 'Password not match!',
              token: ""
            }));

          case 14:
            token = user.generateAuthToken();

            res.status(200).header('x-auth-token', token).send({
              error: false,
              msg: "Login Successful",
              token: token
            });

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

exports.default = router;