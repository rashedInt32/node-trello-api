import mongoose from 'mongoose';
import Joi from 'joi';

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 150,
    required: true
  },
  closed: {
    type: Boolean,
    default: false
  },
  desc: {
    type: String,
    minlength: 5,
    maxlength: 300,
  },
  idBoard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board'
  },
  idChecklists: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'Checklist'}
  ],
  idList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List'
  },
  idMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

const Card = mongoose.model('card', cardSchema);


const cardValidate = (card) => {
  const schema = {
    name: Joi.string().min(2).max(150).required(),
    desc: Joi.string().min(5).max(300),
  }

  return Joi.validate(card, schema);
};

export { Card, cardValidate };
