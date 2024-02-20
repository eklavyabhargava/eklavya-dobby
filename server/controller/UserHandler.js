const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const User = require("../models/UserModel");

router.post("/register", async (req, res) => {
  const { emailId, password } = req.body;

  if (!emailId || !password) {
    return res.status(400).send({ errMsg: "Required fields missing" });
  }

  try {
    // check for uniqueness of emailId and username
    const emailIdFound = await User.findOne({ emailId });
    if (emailIdFound) {
      return res
        .status(400)
        .send({ errMsg: "User with given emailId already exists!" });
    }

    // find user with same username in database
    const userFound = await User.findOne({ username });
    if (userFound) {
      return res.status(400).json({ errMsg: "Username already exists!" });
    }

    // hash password and create new user
    const hashedPassword = await bcryptjs.hash(password, 16);
    const newUser = new User({
      emailId,
      password: hashedPassword,
    });
    const userInfo = await newUser.save();
    req.session.userId = user._id;
    res.status(200).send({
      Success: "Account created successfully!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ errMsg: "Internal error occurred!" });
  }
});

router.post("/login", async (req, res) => {
  const { emailId, password } = req.body;

  if (!emailId || !password) {
    return res.status(400).send({ errMsg: "Required fields missing" });
  }

  try {
    // check username in db
    const user = await User.findOne({ emailId });
    if (user) {
      // compare password and login if password match
      const didMatch = await bcryptjs.compare(password, user.password);
      if (didMatch) {
        return res.status(200).send({
          user,
        });
      } else {
        return res.status(401).send({ errMsg: "Invalid Credentials!" });
      }
    } else {
      return res
        .status(401)
        .send({ errMsg: "There is no account with given email id" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ errMsg: "Internal Error Occurred!" });
  }
});

router.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(500).send({ errMsg: "Internal Error Occurred" });
    } else {
      res.clearCookie("connect.sid");
      res.status(200).send("Logged Out");
    }
  });
});

export default router;
