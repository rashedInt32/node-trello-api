'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateList = exports.List = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listSchema = new _mongoose2.default.Schema({
  name: {
    type: String,
    required: true
  },
  idMemberCreator: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'User'
  },
  idBoard: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'Board'
  },
  closed: {
    type: Boolean,
    default: false
  }
});

var List = _mongoose2.default.model('list', listSchema);

var validateList = function validateList(list) {
  var listSchema = {
    name: _joi2.default.string().required()
  };

  return _joi2.default.validate(list, listSchema);
};

exports.List = List;
exports.validateList = validateList;