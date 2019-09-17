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
  const {
    username,
    firstname,
    lastname,
    email,
    password,
    isAdmin } = req.body;

  // Validate input value to match schema
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send({
    error: true,
    msg: error.details[0].message
  });

  // Check user already registered or not
  let user = await User.find({
    $or: [{ username }, { email }]
  });

  // Email already exists
  if (user.length && user[0].email === email)
    return res.send({
      error: true,
      msg: 'Email already exists'
    });

  // username already tanen
  if (user.length && user[0].username === username)
    return res.send({
      error: true,
      msg: 'Username already taken, try different one'
    });

  // Create user
  user = new User({
    username,
    firstname,
    lastname,
    email,
    password,
    isAdmin
  });

  // Generate hash password
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  // Update user password with hashed
  user.password = hashed;
  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(user);
});


router.get('/user-posts', async (req, res) => {
  const result = await Post.find()
    .populate('author', '_id email');

  const getUserPost = result.filter(
    post => post.author.email === req.body.email
  );

  res.send(getUserPost);
});

export default router;
