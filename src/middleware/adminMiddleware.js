const admin = (req, res, next) => {
  if (!req.user.isAdmin) {
    res.status(401).send({
      error: true,
      msg: "You don't have permission to access"
    });
  }
  next();
};

export default admin;
