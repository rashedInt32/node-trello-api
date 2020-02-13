import express from 'express';
import bcrypt from "bcryptjs";

import { User, validateAuthUser } from "../../models/userSchema";

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  // Validate input value to match schema
  const { error } = validateAuthUser(req.body);
  if (error)
    return res.status(400).send({
      error: true,
      msg: error.details[0].message
    });

  // Find user email
  let user = await User.findOne({ email });
  if (!user)
    return res.status(400).send({
      error: true,
      msg: 'Email Not found',
      token: ""
    });

  // Password validation
  const isValidPassword =
    await bcrypt.compare(password, user.password);

  if (!isValidPassword)
    return res.status(400).send({
      error: true,
      msg: 'Password not match!',
      token: ""
    });

  const token = user.generateAuthToken();
  res.status(200).header('x-auth-token', token).send({
    error: false,
    msg: "Login Successful",
    token: token
  });
});


export default router;
