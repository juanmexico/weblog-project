const path = require("path");
const debug = require("debug")("weblog-app");
const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const expressLayout = require("express-ejs-layouts");
const passport = require("passport");
const dotEnv = require("dotenv");
const morgan = require("morgan");
const flash = require("connect-flash");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const connectDB = require("./config/db");
const winston = require("./config/winston");
const { stream } = require("./config/winston");
//* Load Config
dotEnv.config({ path: "./config/config.env" });

//* Database connection
connectDB();
debug("connect to db");

//* Passport Configuration
require("./config/passport");

const app = express();

//* Logging
if (process.env.NODE_ENV === "development") {
  debug("Moragn Enlebed");
  app.use(morgan("combined", { stream: winston.stream }));
}

//* View Engine
app.use(expressLayout);
app.set("view engine", "ejs");
app.set("layout", "./layouts/mainLayout");
app.set("views", "views");

//* BodyPaser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
//* Session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/blog_db" }),
  })
);

//* Passport
app.use(passport.initialize());
app.use(passport.session());

//* Flash
app.use(flash()); //req.flash

//* Static Folder
app.use(express.static(path.join(__dirname, "public")));

//* Routes
app.use("/", require("./routes/blog"));
app.use("/users", require("./routes/users"));
app.use("/dashboard", require("./routes/dashboard"));

//* 404 Page
app.use((req, res) => {
  res.render("404", { pageTitle: "صفحه پیدا نشد | 404", path: "/404" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
