import verifyToken from './verifyToken';

const auth = (req, res, next) => {
  verifyToken(req, res, next);
}

export default auth;
