const express = require("express");
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const { connection } = require("mongoose");


const requestRouter = express.Router();



requestRouter.post("/request/send/:status/:toUserId", userAuth ,async (req, res) => {

    try{
            const fromUserId = req.user._id;
            const toUserId = req.params.toUserId;
            const status = req.params.status;

            // Corner Case: 1 (only send ignored || interested status in connection request)

            const allowedStatus = ["ignored","interested"];

            if(!allowedStatus.includes(status)){

                return res.status(400).json({
                    message: "Invalid status type -> " + status,
                })
            }

            //Corner Case: 2 (Avoid sending request to existing connection)

            const existingConnnectionRequest = await ConnectionRequest.findOne({

                $or: [
                    {fromUserId,toUserId},
                    {fromUserId : toUserId,toUserId : fromUserId},
                ]
            })

            if(existingConnnectionRequest){
              return  res.status(400).send("Already sent conection request");
            }

            //Corner Case: 3 (Prevent sending request to user who are not present in the DB);

            const toUser = await User.findById(toUserId);

            if(!toUser){
              return  res.status(400).send("User not found");
            }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        })

        //Corner Case: 4 (Cannot send request to yourself)

        // if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){

        //     return res.status(400).send("Cannot send request to yourself");

        // }

        const data = await connectionRequest.save();

        res.json({
            message: "Connection Request Sent Successfully",
            data,
        })
    }
    catch(err){

        res.status(400).send("Error:" + err.message);
    }
  
  
});


module.exports = requestRouter;