import mongoose from 'mongoose';

export const db = {
  connect: async (dbPath, options) => {
    const conn = await mongoose.connect(dbPath, options)
    if (conn === mongoose) {
      console.log("DB connected succesfully!")
      return conn
    }
    console.log('Check your db connection')
  }
};
