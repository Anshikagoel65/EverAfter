const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./modules/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User added successfully...");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = await jwt.sign({ _id: user._id }, "EVER@After$123");

      res.cookie("token", token);
      res.send("Login Successfully!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if(!token) {
      throw new Error("Invalid Token");
    }

    const decodedMesg = await jwt.verify(token, "EVER@After$123");
    const { _id } = decodedMesg;
    
    const user = await User.findById(_id);
    if(!user) {
      throw new Error("User doesn't exist");
    }

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    // const user = await User.findOne({ emailId: userEmail });
    // if (!user) {
    //   res.status(404).send("User not found...");
    // } else {
    //   res.send(user);
    // }

    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found...");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wong...");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wong...");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    //const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully...");
  } catch (err) {
    res.status(400).send("Something went wong...");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoURL", "about", "gender", "skills", "age"];
    const isAllowedUpdates = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isAllowedUpdates) {
      throw new Error("Update not allowed...");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills can not be more than 10");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
      runValidators: "true",
    });
    console.log(user);
    res.send("User updated successfully...");
  } catch (err) {
    res.status(400).send("UPDATE FAILED" + err.message);
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
