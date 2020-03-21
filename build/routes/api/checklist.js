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

var _checkListSchema = require("../../models/checkListSchema");

var router = _express["default"].Router();
/**
 * @routes POST /api/checklist/create
 * @desc Create check list
 * @api private
 */


router.post('/create', _authMiddleware["default"], /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, name, idBoard, idCard, checklist;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, idBoard = _req$body.idBoard, idCard = _req$body.idCard;
            _context.next = 3;
            return _checkListSchema.CheckList.create({
              name: name,
              idBoard: idBoard,
              idCard: idCard
            });

          case 3:
            checklist = _context.sent;
            res.status(200).send(checklist);

          case 5:
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
 * @routes POST /api/checklist/:id/checkitem
 * @desc Create check list items
 * @api private
 */

router.post('/:id/checkitem', _authMiddleware["default"], /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, _req$body2, name, idCheckList, checkList;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id.id;
            _req$body2 = req.body, name = _req$body2.name, idCheckList = _req$body2.idCheckList;
            _context2.next = 4;
            return _checkListSchema.CheckList.findById(id);

          case 4:
            checkList = _context2.sent;

            if (checkList) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.status(400).send({
              error: true,
              msg: 'No checklist found'
            }));

          case 7:
            checkList.checkItems.push({
              status: 'open',
              name: name,
              idCheckList: idCheckList
            });
            checkList.save();
            res.status(200).send(checkList);

          case 10:
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
//# sourceMappingURL=checklist.js.map