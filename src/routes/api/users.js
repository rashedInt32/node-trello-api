import express from 'express';
import bcrypt from 'bcryptjs';

import { User, validateUser } from '../../models/userSchema';
import Post from '../../models/postSchema';

const router = express.Router();

/**
 * @routes GET /api/users/register
 * @desc Register routes
 * @api public
 */
router.post('/register', async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  // Validate input value to match schema
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send({
    error: true,
    msg: error.details[0].message
  });

  // Check user already registered or not
  let user = await User.findOne({ email });
  if (user)
    return res.send({
      error: true,
      msg: 'Email already exists'
    });

  user = new User({ name, email, password, isAdmin });

  // Generate hash password
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  // Update user password with hashed
  user.password = hashed;
  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(user);
});

export default router;
