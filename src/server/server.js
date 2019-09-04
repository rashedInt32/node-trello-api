import express from 'express';
import bodyParser from 'body-parser';

import { config } from '../config/config';
import { db } from '../db/connect';

import users from '../routes/api/users';
import posts from '../routes/api/posts';
import auth from '../routes/api/auth';
import role from '../routes/api/role';


// Initialize express
const app = express();

// Connect DB
db.connect(config.dbUri, {
  useNewUrlParser: true,
  useCreateIndex: true
});

// Initialize body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Apis
app.use('/api/user', users);
app.use('/api/posts', posts);
app.use('/api/auth', auth);
app.use('/api/role', role);

const PORT = process.env.PORT || 3900;
// Listen server
app.listen(PORT, () =>
  console.log(`Backend listening on port ${PORT}`))
