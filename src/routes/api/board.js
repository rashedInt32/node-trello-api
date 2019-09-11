import express from 'express';

import { Board } from '../../models/boradSchema';
import auth from '../../middleware/authMiddleware';

const router = express.Router();

/**
* @routes GET /api/board
* @desc Board routes to get all borads
* @api private
*/
router.get("/", auth,  async (req, res) => {
  const boards = await Board.find({ closed: false });
  if (!boards)
    return res.status(400).send({
      error: true,
      msg: 'You haven\'t created any board yet.'
    });

  return res.status(200).send(boards)
});

/**
* @routes GET /api/board
* @desc Board routes to get all borads
* @api private
*/
router.post("/create", auth, async (req, res) => {
  const { name } = req.body;

  let board = await Board.find({ name });
  if (board.length)
    return res.status(400).send({
      error: true,
      msg: 'There is another board with the same name'
    });

  board = new Board({ name });
  await board.save();
  res.status(200).send(board);
});

export default router;
