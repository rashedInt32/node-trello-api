import express from 'express';

import User from '../../models/userSchema';

const router = express.Router();

/**
 * @routes GET /api/users/register
 * @desc Register routes
 * @api public
 */
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const result = await User.findOne({email});
  if (result !== null)
    return res.send({error: true, msg: 'Email already exists'});

  const newUser = new User({ name, email, password });
  await newUser.save();

  res.send(newUser);
})


export default router;
