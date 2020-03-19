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

var _authMiddleware = require('../../middleware/authMiddleware');

var _authMiddleware2 = _interopRequireDefault(_authMiddleware);

var _cardSchema = require('../../models/cardSchema');

var _boardSchema = require('../../models/boardSchema');

var _listSchema = require('../../models/listSchema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/create', _authMiddleware2.default, function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var _req$body, name, idBoard, idList, card, list, board;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, idBoard = _req$body.idBoard, idList = _req$body.idList;
            _context.next = 3;
            return _cardSchema.Card.create({
              name: name, idBoard: idBoard, idList: idList
            });

          case 3:
            card = _context.sent;
            _context.next = 6;
            return _listSchema.List.findById(idList);

          case 6:
            list = _context.sent;
            _context.next = 9;
            return _boardSchema.Board.findById(idBoard);

          case 9:
            board = _context.sent;

            board.actions.push({
              action: 'createcard',
              data: {
                card: {
                  name: card.name,
                  _id: card._id
                },
                list: {
                  name: list.name,
                  _id: list._id
                }
              }
            });
            _context.next = 13;
            return board.save();

          case 13:

            res.status(200).send(card);

          case 14:
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

// Delete card
router.delete('/delete', _authMiddleware2.default, function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var _req$body2, id, boardId, board, actions;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, id = _req$body2.id, boardId = _req$body2.boardId;

            console.log(req.body);
            _context2.next = 4;
            return _cardSchema.Card.deleteMany({ idList: id });

          case 4:
            _context2.next = 6;
            return _boardSchema.Board.findById(boardId.id).populate({
              path: 'lists',
              model: _listSchema.List
            });

          case 6:
            board = _context2.sent;
            actions = (0, _lodash.remove)(board.actions, function (item) {
              return item.data.list._id === id;
            });

            board.actions = actions;

            _context2.next = 11;
            return board.save();

          case 11:

            res.status(200).send(board);

          case 12:
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

exports.default = router;
//# sourceMappingURL=card.js.map