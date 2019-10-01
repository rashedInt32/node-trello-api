import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/config";

const verifyToken = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token)
    return res.status(401).send({
      error: true,
      msg: 'Access denied, no token provided',
      invalid: false
    });

  try {
    const decode = await jwt.verify(token, JWT_SECRET_KEY);
    req.user = decode;

    next();
  } catch (ex) {
    res.status(401).send({ error: true, msg: "Invalid Token", invalid: true });
  }
}

export default verifyToken;
