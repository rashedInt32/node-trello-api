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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _roleSchema = require('../../models/roleSchema');

var _userSchema = require('../../models/userSchema');

var _authMiddleware = require('../../middleware/authMiddleware');

var _authMiddleware2 = _interopRequireDefault(_authMiddleware);

var _adminMiddleware = require('../../middleware/adminMiddleware');

var _adminMiddleware2 = _interopRequireDefault(_adminMiddleware);

var _roleMiddleware = require('../../middleware/roleMiddleware');

var _roleMiddleware2 = _interopRequireDefault(_roleMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
 * @routes GET /api/role/
 * @desc Get all role
 * @api private
 */

router.get('/', [_authMiddleware2.default, _roleMiddleware2.default], function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_, res) {
    var role;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _roleSchema.Role.find();

          case 2:
            role = _context.sent;

            res.status(200).send(role);

          case 4:
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

/**
 * @routes POST /api/role/create-role
 * @desc Create new role
 * @api private
 */
router.post('/create-role', [_authMiddleware2.default, _adminMiddleware2.default], function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var _req$body, name, read, write, _validateRole, error, role;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, read = _req$body.read, write = _req$body.write;

            // Validate role

            _validateRole = (0, _roleSchema.validateRole)(req.body), error = _validateRole.error;

            if (!error) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt('return', res.status(400).send({
              error: true,
              msg: error.details[0].message
            }));

          case 4:
            _context2.next = 6;
            return _roleSchema.Role.findOne({ name: name });

          case 6:
            role = _context2.sent;

            if (!role) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt('return', res.send({
              error: true,
              msg: 'Role already exist'
            }));

          case 9:

            role = new _roleSchema.Role({ name: name, read: read, write: write });
            _context2.next = 12;
            return role.save();

          case 12:

            res.status(200).send(role);

          case 13:
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

/**
 * @route /api/role/set-role
 * @desc set user role by admin
 * @api private
 */
router.post('/set-role', [_authMiddleware2.default, _adminMiddleware2.default], function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    var _req$body2, email, roleId, user, role, isAssigned;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body2 = req.body, email = _req$body2.email, roleId = _req$body2.roleId;
            // find user and role

            _context3.next = 3;
            return _userSchema.User.findOne({ email: email });

          case 3:
            user = _context3.sent;
            _context3.next = 6;
            return _roleSchema.Role.findOne({ _id: roleId });

          case 6:
            role = _context3.sent;


            // Check, is the user already assign this role
            isAssigned = _lodash2.default.filter(user.role, function (item) {
              return item == roleId;
            });

            if (!isAssigned.length) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt('return', res.status(400).send({
              error: true,
              msg: "Role already assigned to this user"
            }));

          case 10:

            // If no error and user not assigned this
            // role before, set the new role
            user.role = roleId;
            role.users.push(user._id);
            _context3.next = 14;
            return user.save();

          case 14:
            _context3.next = 16;
            return role.save();

          case 16:

            res.status(200).send({
              error: false,
              msg: 'Successfully add role'
            });

          case 17:
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

/**
* @route /api/role/delete-role
* @desc set user role by admin
* @api private
*/
router.delete('/delete-role', [_authMiddleware2.default, _adminMiddleware2.default], function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
    var roleId, role, user;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            roleId = req.body.roleId;
            // Find role and delete

            _context5.next = 3;
            return _roleSchema.Role.findOneAndDelete({ _id: roleId });

          case 3:
            role = _context5.sent;

            if (role) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt('return', res.status(400).send({
              error: true,
              msg: 'Role not found.'
            }));

          case 6:
            _context5.next = 8;
            return _userSchema.User.find({});

          case 8:
            user = _context5.sent;

            user.map(function () {
              var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(item) {
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        if (item.role == roleId) {
                          item.role = '';
                        }
                        _context4.next = 3;
                        return item.save();

                      case 3:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                }, _callee4, undefined);
              }));

              return function (_x9) {
                return _ref5.apply(this, arguments);
              };
            }());

            res.status(200).send(user);

          case 11:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());

exports.default = router;
//# sourceMappingURL=role.js.map