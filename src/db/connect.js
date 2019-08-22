import mongoose from 'mongoose';

export const db = {
  connect: (dbPath, options) => {
    return mongoose.connect(dbPath, options)
      .then(() => console.log('DB connected succesfully!'))
      .catch(err => console.log(err));
  }
};
