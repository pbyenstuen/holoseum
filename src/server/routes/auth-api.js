const express = require("express");
const passport = require("passport");

const authApi = express.Router();

authApi.post("/login", passport.authenticate("local"), (req, res) => {
  console.log(req.session);
  res.status(200).send();
});

authApi.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(204).send();
});

authApi.get("/user", (req, res) => {
  if (!req.user) return res.status(401).send();
  res.status(200).json(req.user.username);
});

module.exports = authApi;