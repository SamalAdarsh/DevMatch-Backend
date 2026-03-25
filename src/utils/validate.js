const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Enter the valid name");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Enter a valid Email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a valid password");
  }
};

const validateProfileEditData = (req) => {
  if (req.body?.skills?.length > 10) {
    throw new Error("Only max 10 skills allowed");
  }
  const allowedEditFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "about",
    "photoURL",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field),
  );

  return isEditAllowed;
};

const validatePasswordUpdateData = (req) => {
  const { oldPassword, newPassword } = req.body;

 
  if (!oldPassword || !newPassword) {
    throw new Error("Both current and new passwords are required");
  }



  if (!validator.isStrongPassword(newPassword, { minLength: 10 })) {
    throw new Error(
      "New password is too weak! Use 10+ chars with uppercase, numbers, and symbols.",
    );
  }

  if (oldPassword === newPassword) {
    throw new Error("New password cannot be the same as the current password");
  }
};

module.exports = {
  validateSignUpData,
  validateProfileEditData,
  validatePasswordUpdateData,
};
