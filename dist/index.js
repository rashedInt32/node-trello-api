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

require('express-async-errors');

var _config = require('./config/config');

var _connect = require('./db/connect');

var _users = require('./routes/api/users');

var _users2 = _interopRequireDefault(_users);

var _posts = require('./routes/api/posts');

var _posts2 = _interopRequireDefault(_posts);

var _auth = require('./routes/api/auth');

var _auth2 = _interopRequireDefault(_auth);

var _role = require('./routes/api/role');

var _role2 = _interopRequireDefault(_role);

var _board = require('./routes/api/board');

var _board2 = _interopRequireDefault(_board);

var _list = require('./routes/api/list');

var _list2 = _interopRequireDefault(_list);

var _card = require('./routes/api/card');

var _card2 = _interopRequireDefault(_card);

var _checklist = require('./routes/api/checklist');

var _checklist2 = _interopRequireDefault(_checklist);

var _upload = require('./routes/api/upload');

var _upload2 = _interopRequireDefault(_upload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Initialize express
var app = (0, _express2.default)();

// Connect DB
// db.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useCreateIndex: true
// })

// mongoose.set('useFindAndModify', false)

// Initialize body parser
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

// app.use(
//   cors({
//     exposedHeaders: 'x-auth-token'
//   })
// )

// app.use('/api/static', express.static(path.join(__dirname, './static/')))

// app.use('/api/uploads', express.static(path.join(__dirname, './uploads/')))

// Upload route

app.get('/hello', function (req, res) {
  return res.json({ msg: 'Hellow' });
});

// app.use('/api/upload', upload)

// // Apis
// app.use('/api/user', users)
// app.use('/api/posts', posts)
// app.use('/api/auth', auth)
// app.use('/api/role', role)
// app.use('/api/board', board)
// app.use('/api/list', list)
// app.use('/api/card', card)
// app.use('/api/checklist', checklist)

var LISTEING_PORT = process.env.now || 3900;
// Listen server
app.listen(LISTEING_PORT, function () {
  return console.log('Backend listening on port ' + _config.PORT);
});