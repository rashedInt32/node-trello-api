"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Upload = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uploadSchema = new _mongoose2.default.Schema({
  userId: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: "User"
  },
  avatarUrl: String
});

var Upload = _mongoose2.default.model('upload', uploadSchema);

exports.Upload = Upload;