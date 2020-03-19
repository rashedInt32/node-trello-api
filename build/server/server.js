'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

require('express-async-errors');

var _config = require('../config/config');

var _connect = require('../db/connect');

var _users = require('../routes/api/users');

var _users2 = _interopRequireDefault(_users);

var _posts = require('../routes/api/posts');

var _posts2 = _interopRequireDefault(_posts);

var _auth = require('../routes/api/auth');

var _auth2 = _interopRequireDefault(_auth);

var _role = require('../routes/api/role');

var _role2 = _interopRequireDefault(_role);

var _board = require('../routes/api/board');

var _board2 = _interopRequireDefault(_board);

var _list = require('../routes/api/list');

var _list2 = _interopRequireDefault(_list);

var _card = require('../routes/api/card');

var _card2 = _interopRequireDefault(_card);

var _checklist = require('../routes/api/checklist');

var _checklist2 = _interopRequireDefault(_checklist);

var _upload = require('../routes/api/upload');

var _upload2 = _interopRequireDefault(_upload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Initialize express
var app = (0, _express2.default)();

// Connect DB
_connect.db.connect(_config.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true
});

_mongoose2.default.set("useFindAndModify", false);

// Initialize body parser
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

app.use((0, _cors2.default)({
  exposedHeaders: 'x-auth-token'
}));

app.use("/api/static", _express2.default.static(_path2.default.join(__dirname, "../static/")));

app.use("/api/uploads", _express2.default.static(_path2.default.join(__dirname, "../../uploads/")));

// Upload route

app.get("/hello", function (req, res) {
  return res.json({ msg: "Hellow" });
});

app.use('/api/upload', _upload2.default);

// Apis
app.use('/api/user', _users2.default);
app.use('/api/posts', _posts2.default);
app.use('/api/auth', _auth2.default);
app.use('/api/role', _role2.default);
app.use('/api/board', _board2.default);
app.use('/api/list', _list2.default);
app.use('/api/card', _card2.default);
app.use('/api/checklist', _checklist2.default);

var LISTEING_PORT = process.env.now || 3900;
// Listen server
app.listen(LISTEING_PORT, function () {
  return console.log('Backend listening on port ' + _config.PORT);
});
//# sourceMappingURL=server.js.map