const User = require("../../models/user");
const { hashStr } = require("../../utilities/utilities");
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");

const auth = {};

//signup page controller

auth.signupPageHandler = (req, res) => {
  try {
    res.render("auth/signup");
  } catch (error) {
    throw error;
  }
};

//signup handler
auth.signupHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({
      name,
      email,
      password: await hashStr(password),
    });

    const result = await user.save();
    res.render("signupdone");
  } catch (error) {
    throw error;
  }
};

//login page controller

auth.loginPageHandler = (req, res) => {
  try {
    res.render("auth/login", {
      err: null,
      emailError: false,
      passwordErr: false,
      email: null,
    });
  } catch (error) {
    throw error;
  }
};
auth.loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const isMatched = await bcrypt.compare(password, user.password);
      if (isMatched) {
        const token = await jwt.sign(
          {
            email,
          },
          process.env.JWT_SECRETE,
          { expiresIn: "1h" }
        );

        res.cookie("access_token", "Bearer " + token, {
          signed: true,
          httpOnly: true,
          secure: true,
        });
        res.redirect("/");
      } else {
        res.render("auth/login", {
          err: "Wrong password!",
          emailError: false,
          passwordErr: true,
          email,
        });
      }
    } else {
      res.render("auth/login", {
        err: "User not found",
        emailError: true,
        passwordErr: false,
        email,
      });
    }
  } catch (error) {
    throw error;
  }
};

auth.logoutHandler = (req, res) => {
  try {
    res.clearCookie("access_token");
    res.redirect("/login");
  } catch (error) {
    throw error;
  }
};

module.exports = auth;
