const { Router } = require("express");

const { auth } = require("../middleware/auth");

const admincontroller = require("../controllers/admincontroller");

const router = new Router();

//  @desc   Dashboard
//  @route  GET /dashboard
router.get("/", auth, admincontroller.getDashboard);

module.exports = router;
