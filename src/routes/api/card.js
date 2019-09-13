import express from 'express';
import auth from '../../middleware/authMiddleware';
import { Card } from '../../models/cardSchema';
import { List } from '../../models/listSchema';

const router = express.Router();

router.post('/create', auth, async (req, res) => {
  const { name, idBoard, idList } = req.body;

  const card = new Card({
    name, idBoard, idList
  });

  await card.save();

  let addToList = await List.findById(idList);
  addToList.idCard.push(card._id);
  await addToList.save();

  res.status(200).send(card);
});

export default router;
