import mongoose from 'mongoose';
import Joi from 'joi';

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const validateRole = (role) => {
  const roleValidateSchema = {
    name: Joi.String().required(),
  }

  return Joi.validate(role, roleValidateSchema);
}

const Role = mongoose.model('Role', roleSchema);

export { Role, validateRole };
