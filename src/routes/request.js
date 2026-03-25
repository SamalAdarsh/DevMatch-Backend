const express = require("express");
const {userAuth} = require("../middlewares/auth");


const requestRouter = express.Router();



requestRouter.post("/sendConnectRequest", userAuth ,async (req, res) => {

  const user = req.user;
  console.log("Connection Request Sent");

  res.send(user.firstName + " sent a connect request");
  
});


module.exports = requestRouter;