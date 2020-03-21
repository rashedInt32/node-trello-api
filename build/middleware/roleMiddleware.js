"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _userSchema = require("../models/userSchema");

var role = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = req.user;
            _context.next = 3;
            return _userSchema.User.findOne({
              _id: user._id
            }).populate('role', 'name read write -_id');

          case 3:
            user = _context.sent;
            // If user is admin, just pass
            if (user.isAdmin) next(); // If user role don't have read and write access
            // then send error response.

            if (!user.role.write && !user.role.read) {
              res.status(401).send({
                error: true,
                msg: "You don't have permission to access"
              });
            }

            next();

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function role(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = role;
exports["default"] = _default;
//# sourceMappingURL=roleMiddleware.js.map