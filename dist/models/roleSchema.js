'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRole = exports.Role = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var roleSchema = new _mongoose2.default.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  users: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'User' }],
  read: {
    type: Boolean,
    default: false
  },
  write: {
    type: Boolean,
    default: false
  }
});

var Role = _mongoose2.default.model('Role', roleSchema);

var validateRole = function validateRole(role) {
  var roleValidateSchema = {
    name: _joi2.default.string().min(2).max(50).required(),
    read: _joi2.default.bool(),
    write: _joi2.default.bool()
  };

  return _joi2.default.validate(role, roleValidateSchema);
};

exports.Role = Role;
exports.validateRole = validateRole;