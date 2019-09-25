import express from 'express';

import { Board, validateBoard } from "../../models/boardSchema";
import { List } from '../../models/listSchema';
import { Card } from '../../models/cardSchema';
import auth from '../../middleware/authMiddleware';

const router = express.Router();

/**
* @routes GET /api/board
* @desc Board routes to get all borads
* @api private
*/
router.get("/", auth,  async (req, res) => {
  const boards = await Board.find({ closed: false, idOrganization:  req.user._id });
  if (!boards)
    return res.status(400).send({
      error: true,
      msg: 'You haven\'t created any board yet.'
    });

  return res.status(200).send(boards)
});

/**
* @routes GET /api/board/:id
* @desc Board routes to get specific board
* @api private
*/
router.get("/:id", auth,  async (req, res) => {
  const { id } = req.params;
  const board = await Board.findById({ _id: id }).populate({
    path: 'lists',
    model: List,
  });

  if (!board)
    return res.status(400).send({
      error: true,
      msg: 'No board found.'
    });

  res.status(200).send({ board });
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

  let { error } = validateBoard(name);
  if (erro)
    return res.status(400).send({
      error: true,
      msg: error.details[0].message
    });

  let board = new Board({ name, idOrganization: req.user._id });
  await board.save();
  res.status(200).send(board);
});

export default router;
