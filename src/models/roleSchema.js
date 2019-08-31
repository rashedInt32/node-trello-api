import mongoose from 'mongoose';
import Joi from 'joi';

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});


const Role = mongoose.model('Role', roleSchema);

const validateRole = (role) => {
  const roleValidateSchema = {
    name: Joi.string().min(2).max(50).required(),
  }

  return Joi.validate(role, roleValidateSchema);
};


export { Role, validateRole };
