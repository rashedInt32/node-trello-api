import mongoose from 'mongoose';

const uploadSchema = new mongoose.Schema({
  { img:
      { data: Buffer, contentType: String }
  }
});

const Upload = mongoose.model('upload', uploadSchema);

export default Upload;
