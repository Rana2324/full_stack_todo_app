//dependencies

const { Router } = require("express");
const {
  loginPageHandler,
  signupPageHandler,
  signupHandler,
  loginHandler,
  logoutHandler,
} = require("../controllers/auth/auth");
const { authChecker } = require("../middlware/auth/authMiddlware");

//router
const authRouter = Router();

//signup page handler
authRouter.get("/signup", authChecker, signupPageHandler);

//signup Handler
authRouter.post("/signup", signupHandler);

//login page handler

authRouter.get("/login", authChecker, loginPageHandler);
authRouter.post("/login", loginHandler);

//logout page handler
authRouter.get("/logout", logoutHandler);

//export
module.exports = authRouter;
