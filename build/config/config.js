"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JWT_SECRET_KEY = exports.MONGODB_URI = exports.PORT = void 0;
var PORT = process.env.PORT; // const MONGODB_URI = process.env.MONGODB_URI
// const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

exports.PORT = PORT;
var MONGODB_URI = "mongodb://rashedInt32:parvez081118@ds213079.mlab.com:13079/trello";
exports.MONGODB_URI = MONGODB_URI;
var JWT_SECRET_KEY = "mysecretkey";
exports.JWT_SECRET_KEY = JWT_SECRET_KEY;
//# sourceMappingURL=config.js.map