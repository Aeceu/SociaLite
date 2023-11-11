const { default: mongoose } = require("mongoose");
const Posts = require("../models/PostModel");
const Users = require("../models/UserModel");

//* Fetch all posts
const HandleGetAllPosts = async (req, res) => {
  try {
    const posts = await Posts.find().populate([
      {
        path: "creator",
        select: "-password",
      },
    ]);
    res.status(200).json({
      message: "Fetch all posts!",
      posts,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to get all posts!",
    });
  }
};

//* Fetch users posts
const HandleUserPosts = async (req, res) => {
  try {
    const userID = req.params.userID;
    const posts = await Posts.find().populate("creator").select("-password");
    const userPosts = posts.filter(
      (post) => post.creator._id.toString() === userID
    );
    res.status(200).json({
      message: "User posts successfully fetch!",
      userPosts,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to get user posts!",
    });
  }
};

//* Create new post
const HandleNewPost = async (req, res) => {
  try {
    const { post } = req.body;
    const userID = req.params.userID;

    const newPost = await Posts.create({
      post: post,
      creator: userID,
    });

    await newPost.save();
    res.status(200).json({
      message: "New post successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create new post!",
    });
  }
};

//* Delete post
const HandleDeletePost = async (req, res) => {
  try {
    const postID = req.params.postID;
    await Posts.findByIdAndRemove(postID);
    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete post!",
    });
  }
};

//* Update post
const HandleUpdatePost = async (req, res) => {
  try {
    const { post } = req.body;
    const postID = req.params.postID;
    const userPost = await Posts.findOne({ _id: postID });

    userPost.post = post;

    await userPost.save();
    res.status(200).json({
      message: "Post updated successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update post!",
    });
  }
};

//* Likes or Unlikes post
const HandleLikes = async (req, res) => {
  try {
    const { postID, userID } = req.body;
    const post = await Posts.findOne({ _id: postID });

    const existingLikeIndex = post.likes.findIndex((like) => like === userID);

    if (existingLikeIndex !== -1) {
      post.likes.splice(existingLikeIndex, 1);
      await post.save();
      return res.status(200).json({
        message: "You unlike a post!",
      });
    } else {
      if (!post.likes.includes(userID)) {
        post.likes.push(userID);
        await post.save();
        return res.status(200).json({
          message: "You like a post!",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to like/unlike post!",
    });
  }
};

//* Fetch the post likes
const HandlePostLikes = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Posts.findOne({ _id: id });
    res.status(200).json({ likes: post.likes.length });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch likes!",
    });
  }
};

//* Add new comment
const HandleCreateComment = async (req, res) => {
  try {
    const { userID, postID, comment } = req.body;
    const commentor = await Users.findOne({ _id: userID }).select(
      "firstname lastname _id username"
    );
    const post = await Posts.findOne({ _id: postID });

    post.comments.push({
      user: {
        username: commentor.username,
        firstname: commentor.firstname,
        lastname: commentor.lastname,
        user_id: commentor._id,
      },
      comment,
      _id: new mongoose.Types.ObjectId(),
    });
    await post.save();
    res.status(200).json({
      message: "Comment created!",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create a comment!",
    });
  }
};

//* Fetch the comments of the post
const HandleGetComments = async (req, res) => {
  try {
    const postID = req.params.postID;
    const post = await Posts.findOne({ _id: postID });
    res.status(200).json({
      message: "Comment fetched!",
      comments: post.comments,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch comment!",
    });
  }
};

module.exports = {
  HandleNewPost,
  HandleDeletePost,
  HandleUpdatePost,
  HandleGetAllPosts,
  HandleUserPosts,
  HandleLikes,
  HandlePostLikes,
  HandleCreateComment,
  HandleGetComments,
};
