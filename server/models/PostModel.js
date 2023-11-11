const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  post: String,
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  },
  comments: Array,
  likes: Array,
});

const Posts = mongoose.model("posts", PostSchema);
module.exports = Posts;
