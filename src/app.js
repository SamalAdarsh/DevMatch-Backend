const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { ReturnDocument } = require("mongodb");
const app = express();

app.use(express.json());

connectDB()
  .then(() => {
    console.log("DB successfully connected");
    app.listen(7777, () => {
      console.log("Server successfully connected");
    });
  })

  .catch((err) => {
    console.error("DB connection failed");
  });

app.post("/signup", async (req, res) => {
  // console.log(req.body);

  //   const user = new User({
  //     firstName: "MS",
  //     lastName: "Dhoni",
  //     emailId: "ms@dhoni.com",
  //     password: "Msd@777",
  //   });

  const user = new User(req.body);

  try {
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("Error in saving the user:" + err.message);
  }
});

//get by userEmail
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

    try {
    const users = await User.findOne({ emailId: userEmail });
    // if (users.length === 0) {
       if(!users){
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }

//   try {
//     const users = await User.find({ emailId: userEmail });
//     if (users.length === 0) {
//       //  if(!users){
//       res.status(404).send("User not found");
//     } else {
//       res.send(users);
//     }
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
});

// get all user, /feed
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//find by Id
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

    try {
    const users = await User.findOne({ emailId: userEmail });
    // if (users.length === 0) {
       if(!users){
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }

});


//delete user
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

    try {
    const user = await User.findByIdAndDelete(userId); //{ _id : userId } = userId
    // if (users.length === 0) {
       if(!user){
      res.status(404).send("User not found");
    } else {
      res.send("user deleted successfully");
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }

});


app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
 

    try {
    // const ALLOWED_UPDATES = [""];
    const user = await User.findOneAndUpdate( {_id : userId},data,{returnDocument:"after", runValidators: true}); 
    console.log(user);
    // if (users.length === 0) {
       if(!user){
      res.status(404).send("User not found");
    } else {
      res.send("user updated successfully");
    }
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }

});

// //update user by Id
// app.patch("/user", async (req, res) => {
//   const userId = req.body.userId;
//   const data = req.body;
//   console.log(data);

//     try {
//     const user = await User.findByIdAndUpdate( {_id : userId},data,{returnDocument:"after"}); 
//     console.log(user);
//     // if (users.length === 0) {
//        if(!user){
//       res.status(404).send("User not found");
//     } else {
//       res.send("user updated successfully");
//     }
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }

// });

