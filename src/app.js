const express = require("express");
const app = express();
const { adminAuth, userAuth } = require("./middleware/auth");

app.use("/admin", adminAuth);

app.post("/user/login", (req, res) => {
  res.send("User login successfully...");
});

app.get("/user/data", userAuth, (req, res) => {
  res.send("User data sent...");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("Authorized user...");
});

app.get("/admin/deleteAllData", (req, res) => {
  res.send("deleted data...");
});

app.listen(7777, () => {
  console.log("Server is successfully running on port 7777...");
});
