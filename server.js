//dependency
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const {
  notFoundHandler,
  errorHandler,
} = require("./middlware/common/errorHandler");
const authRouter = require("./routers/authRouter");
const { authChecker } = require("./middlware/auth/authMiddlware");
const todoRouter = require("./routers/todoRouter");
const Todo = require("./models/Todo");
const indexController = require("./controllers/todo/indexController");

//initialization and config
const app = express();
dotenv.config();
app.set("view engine", "ejs");

//middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRETE));
app.use(express.static("public"));

//router
app.use(authRouter);
app.use(todoRouter);

app.get("/", authChecker, indexController);

//not found handler
app.use(notFoundHandler);

// error handler
app.use(errorHandler);

//mongoDB connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port " + process.env.PORT);
    });
  })
  .catch((err) => console.log(err));
