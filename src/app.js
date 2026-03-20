const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

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
  const user = new User({
    firstName: "MS",
    lastName: "Dhoni",
    emailId: "ms@dhoni.com",
    password: "Msd@777",
  });
  try {
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("Error in saving the user:" + err.message);
  }
});
