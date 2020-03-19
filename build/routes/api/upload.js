'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _uploadSchema = require('../../models/uploadSchema');

var _userSchema = require('../../models/userSchema');

var _authMiddleware = require('../../middleware/authMiddleware');

var _authMiddleware2 = _interopRequireDefault(_authMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var storage = _multer2.default.diskStorage({
  destination: "./uploads/",
  filename: function filename(req, file, cb) {
    _crypto2.default.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err);

      cb(null, raw.toString('hex') + _path2.default.extname(file.originalname));
    });
  }
});

var uploadMiddleware = (0, _multer2.default)({ storage: storage }).single("avatar");

// Upload route
router.post("/", _authMiddleware2.default, uploadMiddleware, function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var file, _ref2, user, updateUser;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return req.file;

          case 2:
            file = _context.sent;

            console.log(file);

            if (file) {
              _context.next = 6;
              break;
            }

            return _context.abrupt('return', res.status(400).send({
              error: true,
              msg: "No file selected to upload"
            }));

          case 6:
            _context.next = 8;
            return req.body;

          case 8:
            _ref2 = _context.sent;
            user = _ref2.user;

            user = JSON.parse(user);

            _context.next = 13;
            return _userSchema.User.findOne({ _id: user._id });

          case 13:
            updateUser = _context.sent;

            if (!(updateUser.avatar !== '')) {
              _context.next = 17;
              break;
            }

            _context.next = 17;
            return (0, _del2.default)(updateUser.avatar);

          case 17:
            updateUser.avatar = file.path;
            _context.next = 20;
            return updateUser.save();

          case 20:

            res.status(200).send(file);

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

exports.default = router;
//# sourceMappingURL=upload.js.map