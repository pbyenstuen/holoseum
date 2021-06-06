const express = require("express");
const passport = require("passport");

const authApi = express.Router();

// POST /api/auth/login
// Authenticates user, which gives access to protected API endpoints. User is added to session and session is stored in MongoDB
authApi.post("/login", passport.authenticate("local"), (req, res) => {
  console.log(req.session);
  res.status(200).send();
});

// POST /api/auth/logout
// Logs out user. Authenticated session ends; no longer access to protected API endpoints
authApi.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(204).send();
});

// GET /api/auth/user
// Returns username of authenticated user, which is used by frontend to give access to admin page
authApi.get("/user", (req, res) => {
  if (!req.user) return res.status(401).send();
  res.status(200).json(req.user.username);
});

module.exports = authApi;