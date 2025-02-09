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

//  @desc dashboard handel  Post create
//  @route  POST /dashboard/add-post
router.post("/add-post", auth, admincontroller.createPost);

module.exports = router;
