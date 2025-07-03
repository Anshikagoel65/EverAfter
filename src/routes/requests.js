const express = require("express");
const requestsRouter = express.Router();
const { userAuth } = require("../middleware/auth");

requestsRouter.post("/sentConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("Connection is established");
  res.send(user.firstName + " send the connection request...");
});

module.exports = requestsRouter;