import express from 'express';
import auth from '../../middleware/authMiddleware';
import { List } from '../../models/listSchema';

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
  res.status(200).send(list);
});

export default router;
