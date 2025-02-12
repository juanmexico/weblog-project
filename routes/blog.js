const { Router } = require("express");
const blogcontroller = require("../controllers/blogcontroller");
const router = new Router();

//  @desc   Weblog Index Page
//  @route  GET /
router.get("/", blogcontroller.getindex);

module.exports = router;
