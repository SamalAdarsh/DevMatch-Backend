const express = require("express");
const { userAuth } = require("../middlewares/auth");
const {
  validateProfileEditData,
  validatePasswordUpdateData,
} = require("../utils/validate");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    // const cookies = req.cookies;

    // const { token } = cookies;

    // if(!token) throw new Error("Invalid Token");

    // const decodedMessage = await jwt.verify(token, "Dev@Match$123");
    // console.log(decodedMessage);

    // const { _id } = decodedMessage;
    // console.log("Logged in user is :" + _id);

    const user = req.user;

    if (!user) throw new Error("User does not exist");
    res.send(user);

    // console.log(cookies);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileEditData(req)) throw new Error("Invalid edit request");

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    //   res.send(`${loggedInUser.firstName}, has successfully updated their profile`);

    res.json({
      message: `${loggedInUser.firstName}, has successfully updated their profile`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    validatePasswordUpdateData(req);

    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password");

    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      throw new Error("Invalid current password");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully!" });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = profileRouter;
