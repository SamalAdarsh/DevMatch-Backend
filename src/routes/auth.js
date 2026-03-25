const express = require ("express");
const { validateSignUpData } = require("../utils/validate");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const authRouter = express.Router();



authRouter.post("/signup", async (req, res) => {
  // const user = new User(req.body);

  try {
    validateSignUpData(req);

    const { password, firstName, lastName, emailId } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});


authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) throw new Error("Invalid Credentials");

    const isPasswordValid = await user.validPassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();
      console.log(token);

      res.cookie("token", token, {expires: new Date(Date.now() + 8*3600000)});
      res.send("Logged in Successfully");
    } else throw new Error("Invalid Credentials");
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});





module.exports = authRouter;