import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  avatarUrl: String
});

const Upload = mongoose.model('upload', uploadSchema);

export default Upload;
