import express from 'express';
import auth from '../../middleware/authMiddleware';
import { List } from '../../models/listSchema';
import { Card } from '../../models/cardSchema';
import { Board } from '../../models/boardSchema';

const router = express.Router();

/**
 * @routes /list/
 * @desc list of board
 * @api private
 */
// router.get('/', auth, async (req, res) => {


// });

/**
 * @routes /list/create
 * @desc list of board
 * @api private
 */
router.post('/create', auth, async (req, res) => {
  const { name, idMemberCreator, idBoard } = req.body;
  let list = new List({
    name,
    idMemberCreator,
    idBoard
  });

  await list.save();

  let board = await Board.findById(idBoard);
  board.lists.push(list._id);
  await board.save();

  res.status(200).send(list);
});


/**
 * @routes /list/archive
 * @desc list of board
 * @api private
 */
router.post('/delete', auth, async (req, res) => {
  const { id } = req.body;
  const list = await List.findByIdAndDelete(id);
  await Card.deleteMany({ idList: id });


  res.status(200).send(list);
});

export default router;
