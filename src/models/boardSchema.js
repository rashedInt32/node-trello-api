import mongoose from 'mongoose';
import Joi from 'joi';

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  idOrganization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  closed: {
    type: Boolean,
    default: false
  },
  invited: {
    type: Boolean,
    default: false
  },
  membership: [{
    idMember: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    memberType: String,
  }],
  lists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'List'
    }
  ],
  actions: [
    {
      idMember: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      data: {
        type: Object
      },
      action: String
    }
  ]
});

const Board = mongoose.model('board', boardSchema);

const validateBoard = (board) => {
  const boardSchema = {
    name: Joi.string().min(5).max(100).required()
  }

  return Joi.validate(board, boardSchema);
};

export { Board, validateBoard };
