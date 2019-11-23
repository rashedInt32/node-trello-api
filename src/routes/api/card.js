import express from 'express';
import { remove } from 'lodash';


import auth from '../../middleware/authMiddleware';
import { Card } from '../../models/cardSchema';
import { Board } from '../../models/boardSchema';
import { List } from '../../models/listSchema';


const router = express.Router();

router.post('/create', auth, async (req, res) => {
  const { name, idBoard, idList } = req.body;

  const card = await Card.create({
    name, idBoard, idList
  });

  let list = await List.findById(idList);

  let board = await Board.findById(idBoard);
  board.actions.push({
    action: 'createcard',
    data: {
      card: {
        name: card.name,
        _id: card._id
      },
      list: {
        name: list.name,
        _id: list._id
      },
    }
  });
  await board.save();

  res.status(200).send(card);
});

// Delete card
router.delete('/delete', auth, async (req, res) => {
  const { id, boardId } = req.body;
  console.log(req.body);
  await Card.deleteMany({idList: id});
  let board = await Board.findById(boardId.id).populate({
    path: 'lists',
    model: List,
  });

  const actions = remove(board.actions, (item => item.data.list._id === id));
  board.actions = actions;

  await board.save();

  res.status(200).send(board);

});

export default router;
