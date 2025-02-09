const { Router } = require("express");

const { auth } = require("../middleware/auth");

const admincontroller = require("../controllers/admincontroller");

const router = new Router();

//  @desc   Dashboard
//  @route  GET /dashboard
router.get("/", auth, admincontroller.getDashboard);

//  @desc   AddPost
//  @route  GET /dashboard/add-post
router.get("/add-post", auth, admincontroller.AddPost);

module.exports = router;
