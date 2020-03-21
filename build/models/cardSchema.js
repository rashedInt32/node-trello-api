"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cardValidate = exports.Card = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _joi = _interopRequireDefault(require("joi"));

var cardSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 150,
    required: true
  },
  closed: {
    type: Boolean,
    "default": false
  },
  desc: {
    type: String,
    minlength: 5,
    maxlength: 300
  },
  idBoard: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Board'
  },
  idChecklists: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Checklist'
  }],
  idList: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'List'
  },
  idMembers: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  }]
});

var Card = _mongoose["default"].model('card', cardSchema);

exports.Card = Card;

var cardValidate = function cardValidate(card) {
  var schema = {
    name: _joi["default"].string().min(2).max(150).required(),
    desc: _joi["default"].string().min(5).max(300)
  };
  return _joi["default"].validate(card, schema);
};

exports.cardValidate = cardValidate;
//# sourceMappingURL=cardSchema.js.map