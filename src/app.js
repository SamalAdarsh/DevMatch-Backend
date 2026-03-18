const express = require("express");

const app = express();

app.use("/user",(req,res)=>{
 
    res.send("HAHAHAHAHA")

})

app.get("/user",(req,res)=>{
 
    res.send({firstName:"Peaky", lastName: "Samal"})

})

app.post("/user",(req,res)=>{
 
    res.send("Data Successfully saved to DB");

})

app.delete("/user",(req,res)=>{
 
    res.send("Deleted Successfully");

})

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



