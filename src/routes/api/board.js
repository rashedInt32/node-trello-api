import express from 'express';

import { Board } from '../../models/boardSchema';
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
* @routes GET /api/board/delete
* @desc Board routes to get all borads
* @api private
*/
router.delete("/delete/:id", auth, async (req, res) => {
  const { id } = req.params;

  let board = await Board.findOneAndDelete({ _id: id });
  console.log(board);
  if (!board)
    return res.status(400).send({
      error: true,
      msg: 'There is no board to delete'
    });

  res.status(200).send({error: true, msg: 'Board deleted'});
});


/**
* @routes GET /api/
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
