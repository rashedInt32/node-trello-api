"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _boardSchema = require("../../models/boardSchema");

var _listSchema = require("../../models/listSchema");

var _cardSchema = require("../../models/cardSchema");

var _userSchema = require("../../models/userSchema");

var _authMiddleware = _interopRequireDefault(require("../../middleware/authMiddleware"));

var router = _express["default"].Router();
/**
* @routes GET /api/board
* @desc Board routes to get all borads
* @api private
*/


router.get("/", _authMiddleware["default"], /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var boards;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _boardSchema.Board.find({
              closed: false,
              idOrganization: req.user._id
            });

          case 2:
            boards = _context.sent;

            if (boards) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.status(400).send({
              error: true,
              msg: 'You haven\'t created any board yet.'
            }));

          case 5:
            return _context.abrupt("return", res.status(200).send(boards));

          case 6:
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
* @routes GET /api/board/:id
* @desc Board routes to get specific board
* @api private
*/

router.get("/:id", _authMiddleware["default"], /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, board;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.next = 3;
            return _boardSchema.Board.findById({
              _id: id
            }).populate([{
              path: "lists",
              model: _listSchema.List
            }, {
              path: "idOrganization",
              model: _userSchema.User
            }]);

          case 3:
            board = _context2.sent;

            if (board) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(400).send({
              error: true,
              msg: 'No board found.'
            }));

          case 6:
            res.status(200).send(board);

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
/**
* @routes PUT /api/board/:id
* @desc Board routes to get specific board
* @api private
*/

router.put("/:id", _authMiddleware["default"], /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, _req$body, name, bgPath, _validateBoard, error, board;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _req$body = req.body, name = _req$body.name, bgPath = _req$body.bgPath;
            _validateBoard = (0, _boardSchema.validateBoard)(req.body), error = _validateBoard.error;

            if (!error) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", res.status(400).send({
              error: true,
              msg: error.details[0].message
            }));

          case 5:
            _context3.next = 7;
            return _boardSchema.Board.findOneAndUpdate({
              _id: id
            }, {
              name: name,
              bgPath: bgPath
            }, {
              "new": true
            });

          case 7:
            board = _context3.sent;

            if (board) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return", res.status(400).send({
              error: true,
              msg: 'No board found.'
            }));

          case 10:
            res.status(200).send(board);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
/**
* @routes GET /api/board/delete
* @desc Board routes to get all borads
* @api private
*/

router["delete"]("/delete/", _authMiddleware["default"], /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, board;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.body.id;
            _context4.next = 3;
            return _boardSchema.Board.findOneAndDelete({
              _id: id
            });

          case 3:
            board = _context4.sent;

            if (board) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.status(400).send({
              error: true,
              msg: 'There is no board to delete'
            }));

          case 6:
            res.status(200).send({
              error: false,
              msg: 'Board deleted'
            });

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
/**
* @routes GET /api/
* @desc Board routes to get all borads
* @api private
*/

router.post("/create", _authMiddleware["default"], /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _req$body2, name, bgPath, _validateBoard2, error, board;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body2 = req.body, name = _req$body2.name, bgPath = _req$body2.bgPath;
            _validateBoard2 = (0, _boardSchema.validateBoard)(req.body), error = _validateBoard2.error;

            if (!error) {
              _context5.next = 4;
              break;
            }

            return _context5.abrupt("return", res.status(400).send({
              error: true,
              msg: error.details[0].message
            }));

          case 4:
            board = new _boardSchema.Board({
              name: name,
              idOrganization: req.user._id,
              bgPath: bgPath
            });
            _context5.next = 7;
            return board.save();

          case 7:
            res.status(200).send(board);

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=board.js.map