'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cardValidate = exports.Card = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cardSchema = new _mongoose2.default.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 150,
    required: true
  },
  closed: {
    type: Boolean,
    default: false
  },
  desc: {
    type: String,
    minlength: 5,
    maxlength: 300
  },
  idBoard: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'Board'
  },
  idChecklists: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Checklist' }],
  idList: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'List'
  },
  idMembers: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

var Card = _mongoose2.default.model('card', cardSchema);

var cardValidate = function cardValidate(card) {
  var schema = {
    name: _joi2.default.string().min(2).max(150).required(),
    desc: _joi2.default.string().min(5).max(300)
  };

  return _joi2.default.validate(card, schema);
};

exports.Card = Card;
exports.cardValidate = cardValidate;