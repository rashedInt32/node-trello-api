'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateBoard = exports.Board = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var boardSchema = new _mongoose2.default.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  idOrganization: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  closed: {
    type: Boolean,
    default: false
  },
  invited: {
    type: Boolean,
    default: false
  },
  membership: [{
    idMember: {
      type: _mongoose2.default.Schema.Types.ObjectId,
      ref: 'user'
    },
    memberType: String
  }],
  lists: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'List'
  }],
  actions: [{
    idMember: {
      type: _mongoose2.default.Schema.Types.ObjectId,
      ref: 'User'
    },
    data: {
      type: Object
    },
    action: String
  }],
  bgPath: String
});

var Board = _mongoose2.default.model('board', boardSchema);

var validateBoard = function validateBoard(board) {
  var boardSchema = {
    name: _joi2.default.string().min(5).max(100).required(),
    bgPath: _joi2.default.string()
  };

  return _joi2.default.validate(board, boardSchema);
};

exports.Board = Board;
exports.validateBoard = validateBoard;