import mongoose from "mongoose";

const schema = mongoose.Schema;

const postSchema = new schema({
  title: String,
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});


const Posts = mongoose.model('Post', postSchema);

export default Posts;
