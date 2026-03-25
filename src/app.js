const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validate");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");

const app = express();

app.use(express.json());
app.use(cookieParser());

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

//login
app.post("/login", async (req, res) => {
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

app.get("/profile",userAuth, async (req, res) => {
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

app.post("/sendConnectRequest", userAuth ,async (req, res) => {

  const user = req.user;
  console.log("Connection Request Sent");

  res.send(user.firstName + " sent a connect request");
  
});

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
    console.log(user);
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
