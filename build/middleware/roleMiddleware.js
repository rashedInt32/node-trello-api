'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _userSchema = require('../models/userSchema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var role = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var user;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = req.user;
            _context.next = 3;
            return _userSchema.User.findOne({ _id: user._id }).populate('role', 'name read write -_id');

          case 3:
            user = _context.sent;


            // If user is admin, just pass
            if (user.isAdmin) next();

            // If user role don't have read and write access
            // then send error response.
            if (!user.role.write && !user.role.read) {
              res.status(401).send({
                error: true,
                msg: "You don't have permission to access"
              });
            }

            next();

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function role(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = role;
//# sourceMappingURL=roleMiddleware.js.map