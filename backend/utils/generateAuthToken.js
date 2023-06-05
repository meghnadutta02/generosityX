const jwt = require("jsonwebtoken");
const generateAuthToken = (_id, name, lastName, email, isAdmin,doNotLogout) => {
  const expiresIn = doNotLogout ? "7d" : "7h";
  return jwt.sign(
    { _id, name, lastName, email, isAdmin },
    process.env.JWT_SECRET_KEY,
    { expiresIn: expiresIn }
  ); //7 hours
};
module.exports={generateAuthToken};