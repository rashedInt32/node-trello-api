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
  const { name, email, password } = req.body;

  // Validate input value to match schema
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send({ error: true, msg: error.details[0].message });

  // Check user already registered or not
  let user = await User.findOne({ email });
  if (user)
    return res.send({ error: true, msg: 'Email already exists' });

  user = new User({ name, email, password });

  // Generate hash password
  bcrypt.genSalt(10, (_, salt) => {
    bcrypt.hash(password, salt, async (_, hash) => {
      user.password = hash
      await user.save();
      res.send(user);
    });
  });
});


router.get('/user-posts', async (req, res) => {
  const result = await Post.find().populate('author', '_id email');
  const getUserPost = result.filter(
    post => post.author.email === req.body.email
  );
  res.send(getUserPost);
})

export default router;
