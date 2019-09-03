import mongoose from 'mongoose';
import Joi from 'joi';

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  read: {
    type: Boolean,
    default: false
  },
  write: {
    type: Boolean,
    default: false
  }
});


const Role = mongoose.model('Role', roleSchema);

const validateRole = (role) => {
  const roleValidateSchema = {
    name: Joi.string().min(2).max(50).required(),
    read: Joi.bool(),
    write: Joi.bool()
  }

  return Joi.validate(role, roleValidateSchema);
};


export { Role, validateRole };
