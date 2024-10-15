const router = require("express").Router();
const {
  createPostCtrl,
  getAllPostsCtrl,
  getSinglePostCtrl,
  getPostCountCtrl,
  deletePostCtrl,
  updatePostCurl,
  updatePostImageCurl,
  toggleLikeCtl,
} = require("../controllers/postsControler");
const photoUpload = require("../middlewares/photoUpload");
const { verifyToken } = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");

// /api/posts
router
  .route("/")
  .post(verifyToken, photoUpload.single("image"), createPostCtrl)
  .get(getAllPostsCtrl);

// /api/posts/count
router.route("/count").get(getPostCountCtrl);

// /api/posts/:id
router
  .route("/:id")
  .get(validateObjectId, getSinglePostCtrl)
  .delete(validateObjectId, verifyToken, deletePostCtrl)
  .put(validateObjectId, verifyToken, updatePostCurl);

// /api/posts/upload-image/:id
router
  .route("/upload-image/:id")
  .put(
    validateObjectId,
    verifyToken,
    photoUpload.single("image"),
    updatePostImageCurl
  );

// /api/posts/like/:id
router.route("/like/:id").put(validateObjectId, verifyToken, toggleLikeCtl);

module.exports = router;
