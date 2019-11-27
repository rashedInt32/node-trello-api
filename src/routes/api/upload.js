import express from 'express';
import multer from 'multer';
import path from 'path';

import auth from "../../middleware/authMiddleware";

const router = express.Router();

var storage = multer.diskStorage({
  destination: "./uploads/",
  filename: async (req, file, cb) => {
    let { user } = await req.body;
    user = JSON.parse(user);
    await cb(null, user.username + path.extname(file.originalname));
  }
});


const upload = multer({ storage: storage }).single("avatar");

// Upload route
router.post('/', auth, upload, async (req, res) => {
  const file = await req.file;

  res.send(file);
})

export default router;
