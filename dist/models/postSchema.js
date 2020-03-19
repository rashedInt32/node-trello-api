"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = _mongoose2.default.Schema;

var postSchema = new schema({
  title: String,
  content: String,
  author: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: "User"
  }
});

var Posts = _mongoose2.default.model('Post', postSchema);

exports.default = Posts;