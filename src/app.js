const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
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

//get by user
app.get("")
