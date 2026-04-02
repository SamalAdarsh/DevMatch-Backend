
const jwt = require("jsonwebtoken");
const User = require("../models/user");


// const adminAuth = (req, res, next) => {
//   console.log("Admin auth is getting checked");

//   const token = "xyz";
//   const isAdminAuth = token === "xyz";

//   if (!isAdminAuth) {
//     res.status(401).send("Unauthorized Request");
//   } else {
//     next();
//   }
// };

// const userAuth = (req, res, next) => {
//   console.log("Admin auth is getting checked 2");

//   const token = "xyz";
//   const isAdminAuth = token === "xyz";

//   if (!isAdminAuth) {
//     res.status(401).send("Unauthorized Request");
//   } else {
//     next();
//   }
// };

const userAuth = async (req,res,next)=>{

  try{const {token} = req.cookies;
  if(!token) res.status(401).send("Please Login!");

  const decodedData = await jwt.verify(token,"Dev@Match$123");

  const {_id} = decodedData;

  const user = await User.findById(_id);
  if(!user) throw new Error("User not found");

  req.user = user;
  next();
}

catch(err){

  res.status(400).send("Error: " + err.message);
}

}


module.exports = {
    userAuth,
}