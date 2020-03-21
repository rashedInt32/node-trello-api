"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckList = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var checkListSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  idBoard: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Board"
  },
  idCard: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Card"
  },
  checkItems: [{
    state: String,
    idCheckList: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: 'CheckList'
    },
    name: String
  }]
});

var CheckList = _mongoose["default"].model('checklist', checkListSchema);

exports.CheckList = CheckList;
//# sourceMappingURL=checkListSchema.js.map