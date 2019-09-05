import mongoose from 'mongoose';
import Joi from 'joi';
import jwt from 'jsonwebtoken';

import { JWT_SECRET_KEY } from '../config/config';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role'}
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({
    _id: this._id,
    isAdmin: this.isAdmin,
    role: this.role
  }, JWT_SECRET_KEY, {});
  return token;
}


const User = mongoose.model('User', userSchema);

const validateUser = (user) => {
  const validateSchema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
    isAdmin: Joi.boolean(),
    role: Joi.array()
  }

  return Joi.validate(user, validateSchema)
}

const validateAuthUser = (user) => {
  const validateSchema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required()
  }


  return Joi.validate(user, validateSchema)
}

export { User, validateUser, validateAuthUser };
