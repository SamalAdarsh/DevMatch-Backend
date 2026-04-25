require("dotenv").config(); 
require("./utils/cronJob");

const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const paymentRouter = require("./routes/payment");
const initializeSocket = require("./utils/socket");
const chatRouter = require("./routes/chat");


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials:true,
}));


//signup
//login
app.use("/",authRouter);


//profile
app.use("/",profileRouter);


//connect
app.use("/",requestRouter);

//feed
app.use("/", userRouter);

//payment
app.use("/",paymentRouter);

//chat
app.use("/", chatRouter);

const server = http.createServer(app);
initializeSocket(server);

//get by userEmail
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.findOne({ emailId: userEmail });
    // if (users.length === 0) {
    if (!users) {
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
    if (!users) {
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
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send("user deleted successfully");
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["age", "gender", "skills", "photoURL", "about"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    if (data?.skills?.length > 10) {
      throw new Error("Only max 10 skills allowed");
    }
    const user = await User.findOneAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    // console.log(user);
    // if (users.length === 0) {
    if (!user) {
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


connectDB()
  .then(() => {
    console.log("DB successfully connected");
    server.listen(process.env.PORT, () => {
      console.log("Server successfully connected");
    });
  })

  .catch((err) => {
    console.error("DB connection failed");
  });
