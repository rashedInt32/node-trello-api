"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateList = exports.List = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _joi = _interopRequireDefault(require("joi"));

var listSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  idMemberCreator: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  },
  idBoard: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Board'
  },
  closed: {
    type: Boolean,
    "default": false
  }
});

var List = _mongoose["default"].model('list', listSchema);

exports.List = List;

var validateList = function validateList(list) {
  var listSchema = {
    name: _joi["default"].string().required()
  };
  return _joi["default"].validate(list, listSchema);
};

exports.validateList = validateList;
//# sourceMappingURL=listSchema.js.map