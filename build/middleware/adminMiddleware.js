"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var admin = function admin(req, res, next) {
  if (!req.user.isAdmin) {
    res.status(401).send({
      error: true,
      msg: "You don't have permission to access"
    });
  }

  next();
};

var _default = admin;
exports["default"] = _default;
//# sourceMappingURL=adminMiddleware.js.map