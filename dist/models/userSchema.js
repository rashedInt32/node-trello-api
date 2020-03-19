'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateAuthUser = exports.validateUser = exports.User = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSchema = new _mongoose2.default.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
    unique: true
  },
  firstname: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  lastname: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  role: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Role' },
  avatar: String
});

userSchema.methods.generateAuthToken = function () {
  var token = _jsonwebtoken2.default.sign({
    firstname: this.firstname,
    lastname: this.lastname,
    isAdmin: this.isAdmin,
    role: this.role,
    username: this.username,
    avatar: this.avatar,
    _id: this._id
  }, _config.JWT_SECRET_KEY, { expiresIn: '24h' });

  return token;
};

var User = _mongoose2.default.model('User', userSchema);

var validateUser = function validateUser(user) {
  var validateSchema = {
    username: _joi2.default.string().min(5).max(20).required(),
    firstname: _joi2.default.string().min(5).max(50).required(),
    lastname: _joi2.default.string().min(5).max(50).required(),
    email: _joi2.default.string().min(5).max(255).required().email(),
    password: _joi2.default.string().min(5).max(1024).required(),
    isAdmin: _joi2.default.boolean(),
    role: _joi2.default.array()
  };

  return _joi2.default.validate(user, validateSchema);
};

var validateAuthUser = function validateAuthUser(user) {
  var validateSchema = {
    email: _joi2.default.string().min(5).max(255).required().email(),
    password: _joi2.default.string().max(1024).required()
  };

  return _joi2.default.validate(user, validateSchema);
};

exports.User = User;
exports.validateUser = validateUser;
exports.validateAuthUser = validateAuthUser;