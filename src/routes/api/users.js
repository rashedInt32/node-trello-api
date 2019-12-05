import express from 'express';
import bcrypt from 'bcryptjs';

import { User, validateUser } from '../../models/userSchema';
import auth from '../../middleware/authMiddleware';

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
    return res.status(400).send({
      error: true,
      msg: 'Email already exists'
    });

  // username already tanen
  if (user.length && user[0].username === username)
    return res.status(400).send({
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
  res.status(200).header('x-auth-token', token).send({error: false, msg: 'Registration successful', token: token});
});


// Get user
router.get('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.status(200).send(user);
});

// Update user
router.put('/:id/update', auth, async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  let user = await User.findById(id);

  if (data.password !== user.password) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(data.password, salt);
    // Update user password with hashed
    data.password = hashed;
  }

  await user.updateOne(data);
  res.status(200).send(user);
});

export default router;
