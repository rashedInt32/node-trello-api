import { User } from '../models/userSchema';

const role = async (req, res, next) => {
  let user = req.user;
  user = await User.findOne({ _id: user._id })
    .populate('role', 'name read write -_id');

  // If user is admin, just pass
  if (user.isAdmin) next();

  // If user role don't have read and write access
  // then send error response.
  if (!user.role.write && !user.role.read) {
    res.status(401).send({
      error: true,
      msg: "You don't have permission to access"
    });
  }

  next();
}

export default role;
