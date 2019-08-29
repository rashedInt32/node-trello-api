import express from 'express';
import { Role, validateRole } from '../../models/roleSchema';

const router = express.Router();

/**
 * @routes GET /api/role/
 * @desc Get all role
 * @api private
 */

router.get('/', async (_, res) => {
  const role = await Role.find();
  res.status(200).send(role);
})

/**
 * @routes POST /api/role/create-role
 * @desc Create new role
 * @api private
 */
router.post('/create-role', async (req, res) => {
  const { name } = req.body;

  // Validate role
  const { error } = validateRole(req.body);
  if (error)
    return res.status(400).send({
      error: true,
      msg: error.details[0].message
    });

  let role = await Role.findOne({ name });
  if (role) return res.send({ error: true, msg: 'Role already exist' });

  role = new Role({ name });
  await role.save();

  res.status(200).send(role);
});

export default router;
