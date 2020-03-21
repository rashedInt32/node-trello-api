"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRole = exports.Role = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _joi = _interopRequireDefault(require("joi"));

var roleSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  users: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  }],
  read: {
    type: Boolean,
    "default": false
  },
  write: {
    type: Boolean,
    "default": false
  }
});

var Role = _mongoose["default"].model('Role', roleSchema);

exports.Role = Role;

var validateRole = function validateRole(role) {
  var roleValidateSchema = {
    name: _joi["default"].string().min(2).max(50).required(),
    read: _joi["default"].bool(),
    write: _joi["default"].bool()
  };
  return _joi["default"].validate(role, roleValidateSchema);
};

exports.validateRole = validateRole;
//# sourceMappingURL=roleSchema.js.map