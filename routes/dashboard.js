const { Router } = require("express");

const { auth } = require("../middleware/auth");

const admincontroller = require("../controllers/admincontroller");

const router = new Router();

//  @desc   Dashboard
//  @route  GET /dashboard
router.get("/", auth, admincontroller.getDashboard);

//  @desc dashboard  AddPost
//  @route  GET /dashboard/add-post
router.get("/add-post", auth, admincontroller.AddPost);

//  @desc dashboard  Edit post
//  @route  GET /dashboard/edit-post/:id
router.get("/edit-post/:id", auth, admincontroller.getEditPost);
//  @desc dashboard  delete post
//  @route  GET /dashboard/delete-post/
router.get("/delete-post/:id", auth, admincontroller.deletePost);

//  @desc dashboard handel  Post create
//  @route  POST /dashboard/add-post
router.post("/add-post", auth, admincontroller.createPost);

//  @desc dashboard handel  Edit post
//  @route  POST /dashboard/edit-post/:id
router.post("/edit-post/:id", auth, admincontroller.editPost);

//  @desc dashboard handel Image upload
//  @route  POST /dashboard/add-post
router.post("/image-upload", auth, admincontroller.uploadImage);

module.exports = router;
