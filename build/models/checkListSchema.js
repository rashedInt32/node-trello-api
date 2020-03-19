"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckList = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkListSchema = new _mongoose2.default.Schema({
  name: {
    type: String,
    required: true
  },
  idBoard: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: "Board"
  },
  idCard: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: "Card"
  },
  checkItems: [{
    state: String,
    idCheckList: {
      type: _mongoose2.default.Schema.Types.ObjectId,
      ref: 'CheckList'
    },
    name: String
  }]
});

var CheckList = _mongoose2.default.model('checklist', checkListSchema);

exports.CheckList = CheckList;
//# sourceMappingURL=checkListSchema.js.map