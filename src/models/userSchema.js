import mongoose from 'mongoose';
import Joi from 'joi';

const schema = mongoose.Schema;

const userSchema = new schema({
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
});

const validateUser = (user) => {
  const validateSchema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required()
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

const User = mongoose.model('User', userSchema);

export { User, validateUser, validateAuthUser };
