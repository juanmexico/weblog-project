const multer = require("multer");
const sharp = require("sharp");
const shortId = require("shortid");

const Blog = require("../models/blog");
const { formatDate } = require("../utils/jalali");
const { get500 } = require("./erorrscontroller");
const { storage, fileFilter } = require("../utils/multer");

exports.getDashboard = async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.user.id });
    res.render("private/blogs", {
      pageTitle: "بخش مدیریت | داشبورد",
      path: "/dashboard",
      layout: "./layouts/dashLayout",
      fullname: req.user.fullname,
      blogs,
      formatDate,
    });
  } catch (err) {
    console.log(err);
    get500(req, res);
  }
};

exports.AddPost = (req, res) => {
  res.render("private/addPost", {
    pageTitle: "بخش مدیریت | ساخت پست جدید",
    path: "/dashboard/add-post",
    layout: "./layouts/dashLayout",
    fullname: req.user.fullname,
  });
};

exports.createPost = async (req, res) => {
  const errorArr = [];

  try {
    await Blog.postValidation(req.body);
    await Blog.create({ ...req.body, user: req.user.id });
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    err.inner.forEach((e) => {
      errorArr.push({
        name: e.path,
        message: e.message,
      });
    });
    res.render("private/addPost", {
      pageTitle: "بخش مدیریت | ساخت پست جدید",
      path: "/dashboard/add-post",
      layout: "./layouts/dashLayout",
      fullname: req.user.fullname,
      errors: errorArr,
    });
  }
};

exports.uploadImage = (req, res) => {
  const upload = multer({
    limits: { fileSize: 4000000 },
    fileFilter: fileFilter,
  }).single("image");

  upload(req, res, async (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .send("حجم عکس ارسالی نباید بیشتر از 4 مگابایت باشد");
      }
      res.status(400).send(err);
    } else {
      if (req.file) {
        const fileName = `${shortId.generate()}_${req.file.originalname}`;
        await sharp(req.file.buffer)
          .jpeg({
            quality: 60,
          })
          .toFile(`./public/uploads/${fileName}`)
          .catch((err) => console.log(err));
        res.status(200).send(`http://localhost:3000/uploads/${fileName}`);
      } else {
        res.send("جهت اپلود عکس رو انتخاب کنید");
      }
    }
  });
};
