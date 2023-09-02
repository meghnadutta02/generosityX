const jwt = require("jsonwebtoken");
const generateAuthToken = (_id, name, lastName, email, isAdmin,doNotLogout) => {
  return jwt.sign(
    { _id, name, lastName, email, isAdmin },
    process.env.JWT_SECRET_KEY,
    { expiresIn: doNotLogout ? "7d" : "5h" }
  );
};
module.exports={generateAuthToken};