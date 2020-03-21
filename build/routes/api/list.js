"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _authMiddleware = _interopRequireDefault(require("../../middleware/authMiddleware"));

var _listSchema = require("../../models/listSchema");

var _cardSchema = require("../../models/cardSchema");

var _boardSchema = require("../../models/boardSchema");

var router = _express["default"].Router();
/**
 * @routes /list/
 * @desc list of board
 * @api private
 */
// router.get('/', auth, async (req, res) => {
// });

/**
 * @routes /list/create
 * @desc list of board
 * @api private
 */


router.post('/create', _authMiddleware["default"], /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, name, idMemberCreator, idBoard, list, board;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, idMemberCreator = _req$body.idMemberCreator, idBoard = _req$body.idBoard;
            list = new _listSchema.List({
              name: name,
              idMemberCreator: idMemberCreator,
              idBoard: idBoard
            });
            _context.next = 4;
            return list.save();

          case 4:
            _context.next = 6;
            return _boardSchema.Board.findById(idBoard);

          case 6:
            board = _context.sent;
            board.lists.push(list._id);
            _context.next = 10;
            return board.save();

          case 10:
            res.status(200).send(list);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
/**
 * @routes /list/archive
 * @desc list of board
 * @api private
 */

router.post('/delete', _authMiddleware["default"], /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, list;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.body.id;
            _context2.next = 3;
            return _listSchema.List.findByIdAndDelete(id);

          case 3:
            list = _context2.sent;
            _context2.next = 6;
            return _cardSchema.Card.deleteMany({
              idList: id
            });

          case 6:
            res.status(200).send(list);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=list.js.map