"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateBoard = exports.Board = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _joi = _interopRequireDefault(require("joi"));

var boardSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  idOrganization: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  closed: {
    type: Boolean,
    "default": false
  },
  invited: {
    type: Boolean,
    "default": false
  },
  membership: [{
    idMember: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: 'user'
    },
    memberType: String
  }],
  lists: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'List'
  }],
  actions: [{
    idMember: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: 'User'
    },
    data: {
      type: Object
    },
    action: String
  }],
  bgPath: String
});

var Board = _mongoose["default"].model('board', boardSchema);

exports.Board = Board;

var validateBoard = function validateBoard(board) {
  var boardSchema = {
    name: _joi["default"].string().min(5).max(100).required(),
    bgPath: _joi["default"].string()
  };
  return _joi["default"].validate(board, boardSchema);
};

exports.validateBoard = validateBoard;
//# sourceMappingURL=boardSchema.js.map