"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _path = _interopRequireDefault(require("path"));

var _multer = _interopRequireDefault(require("multer"));

require("express-async-errors");

var _config = require("../config/config");

var _connect = require("../db/connect");

var _users = _interopRequireDefault(require("../routes/api/users"));

var _posts = _interopRequireDefault(require("../routes/api/posts"));

var _auth = _interopRequireDefault(require("../routes/api/auth"));

var _role = _interopRequireDefault(require("../routes/api/role"));

var _board = _interopRequireDefault(require("../routes/api/board"));

var _list = _interopRequireDefault(require("../routes/api/list"));

var _card = _interopRequireDefault(require("../routes/api/card"));

var _checklist = _interopRequireDefault(require("../routes/api/checklist"));

var _upload = _interopRequireDefault(require("../routes/api/upload"));

// Initialize express
var app = (0, _express["default"])(); // Connect DB

_connect.db.connect(_config.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true
});

_mongoose["default"].set("useFindAndModify", false); // Initialize body parser


app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json());
app.use((0, _cors["default"])({
  exposedHeaders: 'x-auth-token'
}));
app.use("/api/static", _express["default"]["static"](_path["default"].join(__dirname, "../static/")));
app.use("/api/uploads", _express["default"]["static"](_path["default"].join(__dirname, "../../uploads/"))); // Upload route

app.get("/hello", function (req, res) {
  return res.json({
    msg: "Hellow"
  });
});
app.use('/api/upload', _upload["default"]); // Apis

app.use('/api/user', _users["default"]);
app.use('/api/posts', _posts["default"]);
app.use('/api/auth', _auth["default"]);
app.use('/api/role', _role["default"]);
app.use('/api/board', _board["default"]);
app.use('/api/list', _list["default"]);
app.use('/api/card', _card["default"]);
app.use('/api/checklist', _checklist["default"]);
var LISTEING_PORT = process.env.now || 3900; // Listen server

app.listen(LISTEING_PORT, function () {
  return console.log("Backend listening on port ".concat(_config.PORT));
});
//# sourceMappingURL=server.js.map