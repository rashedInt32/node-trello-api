import mongoose from 'mongoose';

const checkListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  idBoard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board"
  },
  idCard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Card"
  },
  checkItems: [
    {
      state: String,
      idCheckList: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CheckList',
      },
      name: String
    }
  ]
});

const CheckList = mongoose.model('checklist', checkListSchema);

export { CheckList };
