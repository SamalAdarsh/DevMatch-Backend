const express = require("express");

const {adminAuth,userAuth} = require("./middlewares/auth")

const app = express();

// app.get(/.*fly$/,(req,res)=>{

//     res.send({firstName:"Peaky", lastName: "Blinders"})

// })

// app.use("/user", (req,res,next)=>{
//     console.log("Handle 1");
//      next();
//     // res.send("Respone 1");
// },
// [
// (req,res,next)=>{
//     console.log("Handle 2");
//     // res.send("Respone 2");
//       next();
// },
// (req,res,next)=>{
//     console.log("Handle 3");
//     // res.send("Respone 2");
//       next();
// }],
// (req,res,next)=>{
//     console.log("Handle 4");
//     // res.send("Respone 2");
//       next();
// },
// (req,res,next)=>{
//     console.log("Handle 5");
//     res.send("Respone 5");
//       next();
// }

// )

// app.use("/", (req, res, next) => {
//   console.log("Handle/route");
//   // res.send("Response")
//   next();
// });

// app.get(
//   "/user",
//   (req, res, next) => {
//     console.log("Handle 1");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Handle 2");
//     res.send("Response 2");
//   },
// );

// app.get("/user",(req,res,next)=>{

//     console.log("Handle 2");
//    res.send("Response 2");
// })

// app.get("/user/:userId/:name/:password",(req,res)=>{

//     console.log(req.params)
//     res.send({firstName:"Peaky", lastName: "Blinders"})

// })

//MiddleWare Authentication

app.get("/admin", adminAuth);

app.get("/user", userAuth, (req, res) => {
res.send("User Data");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All Data Sent 2");
});

app.get("/admin/deleteUser", (req, res) => {
  // console.log("Delete User");

  res.send("Delete Sent");
});

app.listen(7777, () => {
  console.log("Server successfully connected");
});

// app.use("/user",(req,res)=>{

//     res.send("HAHAHAHAHA")

// })

// app.get("/user",(req,res)=>{

//     res.send({firstName:"Peaky", lastName: "Samal"})

// })

// app.post("/user",(req,res)=>{

//     res.send("Data Successfully saved to DB");

// })

// app.delete("/user",(req,res)=>{

//     res.send("Deleted Successfully");

// })

// app.listen(7777);

// console.log("Server successfully connected");

// app.use((req,res)=>{

//     res.send("Hello from the server");

// })

// app.use("/test",(req,res)=>{

//     res.send("Let's Test");

// })

// app.use("/",(req,res)=>{

//     res.send("Adarsh");

// })

// app.use("/Bye",(req,res)=>{

//     res.send("Byee");

// })
