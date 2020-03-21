"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Upload = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var uploadSchema = new _mongoose["default"].Schema({
  userId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  },
  avatarUrl: String
});

var Upload = _mongoose["default"].model('upload', uploadSchema);

exports.Upload = Upload;
//# sourceMappingURL=uploadSchema.js.map