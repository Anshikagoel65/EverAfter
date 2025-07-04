const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Please enter a valid name...");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Please enter valid email address...");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter strong password...");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditField = [
    "firstName",
    "lastName",
    "emailId",
    "age",
    "skills",
    "about",
    "photoURL",
    "gender",
  ];

  const isAllowedEdit = Object.keys(req.body).every((field) =>
    allowedEditField.includes(field)
  );

  req.send(isAllowedEdit);
};

module.exports = {
  validateSignUpData,
  validateEditProfileData,
};
