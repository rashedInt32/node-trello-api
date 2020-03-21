"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var schema = _mongoose["default"].Schema;
var postSchema = new schema({
  title: String,
  content: String,
  author: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  }
});

var Posts = _mongoose["default"].model('Post', postSchema);

var _default = Posts;
exports["default"] = _default;
//# sourceMappingURL=postSchema.js.map