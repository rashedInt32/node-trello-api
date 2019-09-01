import express from 'express';
import _ from 'lodash';
import { Role, validateRole } from '../../models/roleSchema';
import { User } from '../../models/userSchema';

import auth from '../../middleware/authMiddleware';
import admin from '../../middleware/adminMiddleware';

const router = express.Router();

/**
 * @routes GET /api/role/
 * @desc Get all role
 * @api private
 */

router.get('/', [auth, admin], async (_, res) => {
  const role = await Role.find();
  res.status(200).send(role);
})

/**
 * @routes POST /api/role/create-role
 * @desc Create new role
 * @api private
 */
router.post('/create-role', [auth, admin], async (req, res) => {
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


/**
 * @route /api/role/set-role
 * @desc set user role by admin
 * @api private
 */
router.post('/set-role', [auth, admin], async (req, res) => {
  const { email, roleId } = req.body;
  // find user and role
  let user = await User.findOne({ email });
  let role = await Role.findOne({ _id: roleId });

  // Check, is the user already assign this role
  const isAssigned = _.filter(user.role, item => item == roleId );

  if (isAssigned.length)
    return res
      .status(400)
      .send({
        error: true,
        msg: "Role already assigned to this user"
      });

  // If no error and user not assigned this
  // role before, set the new role
  user.role.push(roleId);
  role.users.push(user._id);
  await user.save();
  await role.save();

  res.status(200).send({
    error: false,
    msg: 'Successfully add role'
  });
});

/**
* @route /api/role/delete-role
* @desc set user role by admin
* @api private
*/

router.delete('/delete-role', [auth, admin], async (req, res) => {
  const { roleId } = req.body;

  const role = await Role.find({_id: roleId});
  if (!role)
    return res.status(400).send({
      error: true,
      msg: 'Role not found.'
    });
  const user = await User.find({});
  user.map(item => {
    item.role.remove(roleId)
    return item;
  });
  //await newuser.save();
  // await role.save();
  res.status(200).send(user);
});

export default router;
