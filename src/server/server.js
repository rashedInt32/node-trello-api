import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import multer from 'multer';
import crypto from 'crypto';
import mime from 'mime';

import 'express-async-errors';

import { PORT, MONGODB_URI } from '../config/config';
import { db } from '../db/connect';

import users from '../routes/api/users';
import posts from '../routes/api/posts';
import auth from '../routes/api/auth';
import role from '../routes/api/role';
import board from '../routes/api/board';
import list from '../routes/api/list';
import card from '../routes/api/card';
import checklist from '../routes/api/checklist';
//import upload from '../routes/api/upload';


// Initialize express
const app = express();

// Connect DB
db.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.set("useFindAndModify", false);


var storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
});
var upload = multer({ storage: storage });



// Initialize body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cors({
    exposedHeaders: 'x-auth-token',
  })
);


app.use("/api/static", express.static(path.join(__dirname, "../static/")));



app.post("/api/upload", upload.single("avatar"), async (req, res) => {
  const file = await req.file;

  res.send(file);
});


// Apis
app.use('/api/user', users);
app.use('/api/posts', posts);
app.use('/api/auth', auth);
app.use('/api/role', role);
app.use('/api/board', board);
app.use('/api/list', list);
app.use('/api/card', card);
app.use('/api/checklist', checklist);

const LISTEING_PORT = 3900;
// Listen server
app.listen(LISTEING_PORT, () =>
  console.log(`Backend listening on port ${PORT}`)
);
