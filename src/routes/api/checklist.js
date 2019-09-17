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


/**
 * @routes POST /api/checklist/:id/checkitem
 * @desc Create check list items
 * @api private
 */
router.post('/:id/checkitem', auth, async (req, res) => {
  const { id } = req.params.id;
  const { name, idCheckList } = req.body;

  let checkList = await CheckList.findById(id);
  if (!checkList)
    return res.status(400).send({
      error: true,
      msg: 'No checklist found'
    });

  checkList.checkItems.push({
    status: 'open',
    name,
    idCheckList
  });

  checkList.save();

  res.status(200).send(checkList);
});

export default router;
