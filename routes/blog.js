const { Router } = require("express");
const blogcontroller = require("../controllers/blogcontroller");
const router = new Router();

//  @desc   Weblog Index Page
//  @route  GET /
router.get("/", blogcontroller.getindex);

//  @desc   Weblog page post
//  @route  GET /
router.get("/post/:id", blogcontroller.getSinglePost);

module.exports = router;
