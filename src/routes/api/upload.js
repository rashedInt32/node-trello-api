import express from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import glob from 'glob';
import del from 'del';

import { Upload } from '../../models/uploadSchema';
import {User} from '../../models/userSchema';
import auth from "../../middleware/authMiddleware";

const router = express.Router();

var storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
});


const uploadMiddleware = multer({ storage: storage }).single("avatar");


// Upload route
router.post("/", auth, uploadMiddleware, async (req, res) => {
  const file = await req.file;
  console.log(file);
  if (!file)
    return res.status(400).send({
      error: true,
      msg: "No file selected to upload"
    });

  let { user } = await req.body;
  user = JSON.parse(user);

  let updateUser = await User.findOne({ _id: user._id });
  if (updateUser.avatar !== '') {
    await del(updateUser.avatar);
  }
  updateUser.avatar = file.path;
  await updateUser.save();

  res.status(200).send(file);
});

export default router;
