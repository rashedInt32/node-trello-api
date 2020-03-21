"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateAuthUser = exports.validateUser = exports.User = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _joi = _interopRequireDefault(require("joi"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = require("../config/config");

var userSchema = new _mongoose["default"].Schema({
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
    "default": false
  },
  role: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Role'
  },
  avatar: String
});

userSchema.methods.generateAuthToken = function () {
  var token = _jsonwebtoken["default"].sign({
    firstname: this.firstname,
    lastname: this.lastname,
    isAdmin: this.isAdmin,
    role: this.role,
    username: this.username,
    avatar: this.avatar,
    _id: this._id
  }, _config.JWT_SECRET_KEY, {
    expiresIn: '24h'
  });

  return token;
};

var User = _mongoose["default"].model('User', userSchema);

exports.User = User;

var validateUser = function validateUser(user) {
  var validateSchema = {
    username: _joi["default"].string().min(5).max(20).required(),
    firstname: _joi["default"].string().min(5).max(50).required(),
    lastname: _joi["default"].string().min(5).max(50).required(),
    email: _joi["default"].string().min(5).max(255).required().email(),
    password: _joi["default"].string().min(5).max(1024).required(),
    isAdmin: _joi["default"]["boolean"](),
    role: _joi["default"].array()
  };
  return _joi["default"].validate(user, validateSchema);
};

exports.validateUser = validateUser;

var validateAuthUser = function validateAuthUser(user) {
  var validateSchema = {
    email: _joi["default"].string().min(5).max(255).required().email(),
    password: _joi["default"].string().max(1024).required()
  };
  return _joi["default"].validate(user, validateSchema);
};

exports.validateAuthUser = validateAuthUser;
//# sourceMappingURL=userSchema.js.map