const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
      trim: true
    },

    lastName: {
      type: String,
      maxLength: 50,
      trim: true,
    },

    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxLength: 50,
      validate(value){

        if(!validator.isEmail(value)){

            throw new Error("Invalid Email Entered" + value)
        }
      }
   
    },

    password: {
      type: String,
      required: true,
      minLength: 10,
        validate(value){

        if(!validator.isStrongPassword(value)){

            throw new Error("Invalid Password Entered" + value)
        }
      }
    },

    age: {
      type: Number,
      min: 18,
    },

    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },

    photoURL: {
      type: String,
      default:
        "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",

      validate(value){

        if(!validator.isURL(value)){

            throw new Error("Invalid Email Entered" + value)
        }
      }
    },

    about: {
      type: String,
      default: "This is default about of the user",
      trim: true,
    },

    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.getJWT = async function(){

    const user = this;

    const token = await jwt.sign({ _id: user._id }, "Dev@Match$123",{expiresIn: "7d"});

    return token;
}

userSchema.methods.validPassword = async function(passwordInputByUser){

    const user = this;
    const passwordHash = user.password;

 const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);


    return isPasswordValid;
}

 

const User = mongoose.model("User", userSchema);

module.exports = User;
