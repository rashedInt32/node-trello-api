"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _crypto = _interopRequireDefault(require("crypto"));

var _glob = _interopRequireDefault(require("glob"));

var _del = _interopRequireDefault(require("del"));

var _uploadSchema = require("../../models/uploadSchema");

var _userSchema = require("../../models/userSchema");

var _authMiddleware = _interopRequireDefault(require("../../middleware/authMiddleware"));

var router = _express["default"].Router();

var storage = _multer["default"].diskStorage({
  destination: "./uploads/",
  filename: function filename(req, file, cb) {
    _crypto["default"].pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err);
      cb(null, raw.toString('hex') + _path["default"].extname(file.originalname));
    });
  }
});

var uploadMiddleware = (0, _multer["default"])({
  storage: storage
}).single("avatar"); // Upload route

router.post("/", _authMiddleware["default"], uploadMiddleware, /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var file, _yield$req$body, user, updateUser;

    return _regenerator["default"].wrap(function _callee$(_context) {
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

            return _context.abrupt("return", res.status(400).send({
              error: true,
              msg: "No file selected to upload"
            }));

          case 6:
            _context.next = 8;
            return req.body;

          case 8:
            _yield$req$body = _context.sent;
            user = _yield$req$body.user;
            user = JSON.parse(user);
            _context.next = 13;
            return _userSchema.User.findOne({
              _id: user._id
            });

          case 13:
            updateUser = _context.sent;

            if (!(updateUser.avatar !== '')) {
              _context.next = 17;
              break;
            }

            _context.next = 17;
            return (0, _del["default"])(updateUser.avatar);

          case 17:
            updateUser.avatar = file.path;
            _context.next = 20;
            return updateUser.save();

          case 20:
            res.status(200).send(file);

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=upload.js.map