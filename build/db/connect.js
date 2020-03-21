"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var db = {
  connect: function () {
    var _connect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(dbPath, options) {
      var conn;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _mongoose["default"].connect(dbPath, options);

            case 2:
              conn = _context.sent;

              if (!(conn === _mongoose["default"])) {
                _context.next = 6;
                break;
              }

              console.log("DB connected succesfully!");
              return _context.abrupt("return", conn);

            case 6:
              console.log('Check your db connection');

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function connect(_x, _x2) {
      return _connect.apply(this, arguments);
    }

    return connect;
  }()
};
exports.db = db;
//# sourceMappingURL=connect.js.map