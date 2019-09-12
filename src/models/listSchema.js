import mongoose from "mongoose";
import Joi from 'joi';

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  idMemberCreator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  idBoard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board'
  },
  closed: {
    type: Boolean,
    default: false
  }
});

const List = mongoose.model('list', listSchema);

const validateList = list => {
  const listSchema = {
    name: Joi.string().required()
  };

  return Joi.validate(list, listSchema);
};


export { List, validateList };
