const express = require("express");
const {
  HandleNewPost,
  HandleDeletePost,
  HandleUpdatePost,
  HandleGetAllPosts,
  HandleLikes,
  HandlePostLikes,
  HandleGetComments,
  HandleCreateComment,
  HandleUserPosts,
} = require("../controllers/PostController");

const router = express.Router();

router.get("/posts", HandleGetAllPosts);
router.get("/posts/:userID", HandleUserPosts);
router.post("/post/:userID", HandleNewPost);
router.delete("/post/:postID", HandleDeletePost);
router.patch("/post/:postID", HandleUpdatePost);
router.post("/handlelikes", HandleLikes);
router.get("/postlikes/:id", HandlePostLikes);
router.get("/postcomments/:postID", HandleGetComments);
router.post("/createcomment", HandleCreateComment);
module.exports = router;
