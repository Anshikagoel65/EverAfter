const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./modules/user");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Ishika",
    lastName: "Goel",
    emailId: "ishika@goel123",
    password: "ishika@123",
  });

  try {
    await user.save();
    res.send("User added successfully...");
  } catch (err) {
    res.status(400).send("Error saving user to database: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is successfully running on port 7777...");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected...");
  });
