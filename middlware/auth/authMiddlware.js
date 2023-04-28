const express = require("express");
const jwt = require("jsonwebtoken");

async function authChecker(req, res, next) {
  try {
    if (req.signedCookies.access_token) {
      const token = req.signedCookies.access_token.split(" ")[1];

      const decode = await jwt.verify(token, process.env.JWT_SECRETE);
      req.email = decode.email;
      if (req.url === "/login" || req.url === "/signup") {
        return res.redirect("/");
      }
      next();
    } else {
      if (req.url === "/signup") {
        return res.render("auth/signup", {
          err: null,
          emailError: false,
          passwordErr: false,
          email: null,
        });
      }
      res.render("auth/login", {
        err: null,
        emailError: false,
        passwordErr: false,
        email: null,
      });
    }
  } catch (error) {
    throw error;
  }
}

module.exports = { authChecker };
