import express from 'express';
import { Role, validateRole } from '../../models/roleSchema';

const router = express.Router();

router.post('/create-role', async (req, res) => {
  const { name } = req.body;

  // Validate role
  const { error } = validateRole(name);
  if (error)
    return res.status(400).send({
      error: true,
      msg: error.details[0].message
    });

  let role = await Role.findOne({ name });
  if (role) return res.send({ error: true, msg: 'Role already exist' });

  role = new Role({ name });

  await role.save();
});

export default router;
