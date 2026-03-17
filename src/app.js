const express = require("express");

const app = express();

// app.listen(7777);

// console.log("Server successfully connected");

app.listen(7777,()=>{
  
    console.log("Server successfully connected");

})

// app.use((req,res)=>{
  
//     res.send("Hello from the server");

// })

app.use("/test",(req,res)=>{
  
    res.send("Let's Test");

})

// app.use("/",(req,res)=>{
  
//     res.send("Adarsh");

// })

app.use("/Bye",(req,res)=>{
  
    res.send("Byee");

})



