import express from 'express';
import Auth from '../../middleware/authMiddleware';
import { CheckList } from '../../models/checkListSchema';

const router = express.Router();

/**
 * @routes POST /api/checklist/create
 * @desc Create check list
 * @api private
 */
router.post('/create', Auth, async (req, res) => {
  const { name, idBoard, idCard } = req.body;

  const checklist = await CheckList.create({ name, idBoard, idCard });
  res.status(200).send(checklist);
});

export default router;
