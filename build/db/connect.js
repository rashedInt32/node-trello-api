'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = exports.db = {
  connect: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dbPath, options) {
      var conn;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _mongoose2.default.connect(dbPath, options);

            case 2:
              conn = _context.sent;

              if (!(conn === _mongoose2.default)) {
                _context.next = 6;
                break;
              }

              console.log("DB connected succesfully!");
              return _context.abrupt('return', conn);

            case 6:
              console.log('Check your db connection');

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    function connect(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return connect;
  }()
};
//# sourceMappingURL=connect.js.map