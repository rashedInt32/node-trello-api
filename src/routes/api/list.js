import express from 'express';
import auth from '../../middleware/authMiddleware';
import { List } from '../../models/listSchema';
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
router.post('/archive', auth, async (req, res) => {
  const { id } = req.body;
  const list = await List.findByIdAndUpdate(
    id,
    { closed: true },
    { new: true }
  );

  res.status(200).send(list);
});

export default router;
