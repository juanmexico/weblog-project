const { create } = require("connect-mongo");
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  body: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "عمومی",
    enum: ["خصوصی", "عمومی"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectIdS,
    ref: "User",
  },
  createdAd: {
    type: Date,
    default: Data.now,
  },
});
module.exports = mongoose.model("blog", blogSchema);
