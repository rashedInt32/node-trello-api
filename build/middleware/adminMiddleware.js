"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var admin = function admin(req, res, next) {
  if (!req.user.isAdmin) {
    res.status(401).send({
      error: true,
      msg: "You don't have permission to access"
    });
  }
  next();
};

exports.default = admin;
//# sourceMappingURL=adminMiddleware.js.map