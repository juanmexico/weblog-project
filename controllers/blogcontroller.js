const Blog = require("../models/blog");
const { formatDate } = require("../utils/jalali");

exports.getindex = async (req, res) => {
  try {
    const posts = await Blog.find({ status: "public" }).sort({
      createdAt: "desc",
    });

    res.render("index", {
      pageTitle: "وبلاگ",
      path: "/",
      posts,
      formatDate,
    });
  } catch (err) {
    console.log(err);
    res.render("errors/500");
  }
};
