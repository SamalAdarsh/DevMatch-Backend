const express = require("express");
const connectDB = require("./config/database");
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


