const express = require("express");
const {userAuth} = require("../middlewares/auth");

const profileRouter = express.Router();

profileRouter.get("/profile",userAuth, async (req, res) => {
  try {
    // const cookies = req.cookies;

    // const { token } = cookies;

    // if(!token) throw new Error("Invalid Token");

    // const decodedMessage = await jwt.verify(token, "Dev@Match$123");
    // console.log(decodedMessage);

    // const { _id } = decodedMessage;
    // console.log("Logged in user is :" + _id);

    const user = req.user;
    
    if(!user) throw new Error("User does not exist");
   res.send(user);

    // console.log(cookies);
   
  } catch (err) {

     res.status(400).send("ERROR:" + err.message);

  }
});

module.exports = profileRouter;