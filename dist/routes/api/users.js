'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _userSchema = require('../../models/userSchema');

var _authMiddleware = require('../../middleware/authMiddleware');

var _authMiddleware2 = _interopRequireDefault(_authMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
 * @routes GET /api/users/register
 * @desc Register routes
 * @api public
 */
router.post('/register', function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var _req$body, username, firstname, lastname, email, password, isAdmin, _validateUser, error, user, salt, hashed, token;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, firstname = _req$body.firstname, lastname = _req$body.lastname, email = _req$body.email, password = _req$body.password, isAdmin = _req$body.isAdmin;

            // Validate input value to match schema

            _validateUser = (0, _userSchema.validateUser)(req.body), error = _validateUser.error;

            if (!error) {
              _context.next = 4;
              break;
            }

            return _context.abrupt('return', res.status(400).send({
              error: true,
              msg: error.details[0].message
            }));

          case 4:
            _context.next = 6;
            return _userSchema.User.find({
              $or: [{ username: username }, { email: email }]
            });

          case 6:
            user = _context.sent;

            if (!(user.length && user[0].email === email)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt('return', res.status(400).send({
              error: true,
              msg: 'Email already exists'
            }));

          case 9:
            if (!(user.length && user[0].username === username)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt('return', res.status(400).send({
              error: true,
              msg: 'Username already taken, try different one'
            }));

          case 11:

            // Create user
            user = new _userSchema.User({
              username: username,
              firstname: firstname,
              lastname: lastname,
              email: email,
              password: password,
              isAdmin: isAdmin
            });

            // Generate hash password
            _context.next = 14;
            return _bcryptjs2.default.genSalt(10);

          case 14:
            salt = _context.sent;
            _context.next = 17;
            return _bcryptjs2.default.hash(password, salt);

          case 17:
            hashed = _context.sent;

            // Update user password with hashed
            user.password = hashed;
            _context.next = 21;
            return user.save();

          case 21:
            token = user.generateAuthToken();

            res.status(200).header('x-auth-token', token).send({ error: false, msg: 'Registration successful', token: token });

          case 23:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// Get user
router.get('/:id', _authMiddleware2.default, function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var id, user;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.next = 3;
            return _userSchema.User.findById(id);

          case 3:
            user = _context2.sent;

            res.status(200).send(user);

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

// Update user
router.put('/:id/update', _authMiddleware2.default, function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    var id, data, user, salt, hashed;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            data = req.body.data;
            _context3.next = 4;
            return _userSchema.User.findById(id);

          case 4:
            user = _context3.sent;

            if (!(data.password !== user.password)) {
              _context3.next = 13;
              break;
            }

            _context3.next = 8;
            return _bcryptjs2.default.genSalt(10);

          case 8:
            salt = _context3.sent;
            _context3.next = 11;
            return _bcryptjs2.default.hash(data.password, salt);

          case 11:
            hashed = _context3.sent;

            // Update user password with hashed
            data.password = hashed;

          case 13:
            _context3.next = 15;
            return user.updateOne(data);

          case 15:
            res.status(200).send(user);

          case 16:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

exports.default = router;