import express from 'express';
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

export default router;
