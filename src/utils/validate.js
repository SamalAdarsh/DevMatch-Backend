const validator = require("validator");

const validateSignUpData = (req)=>{

    const{firstName,lastName,emailId, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Enter the valid name");
    }
    else if(!validator.isEmail(emailId)){
         throw new Error("Enter a valid Email");
    }
       else if(!validator.isStrongPassword(password)){
         throw new Error("Enter a valid password");
    }
};

module.exports = {
    validateSignUpData,
}