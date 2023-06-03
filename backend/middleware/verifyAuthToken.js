//to read cookies : npm i cookie-parser
const jwt = require("jsonwebtoken");
const verifyIfLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token)
      return res.status(403).send("A token is required for authentication");
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); //when user logs in,a token is generated which lasts for 7 hours or 7 days
      req.user = decoded;
     
      next();
    } catch (err) {

      return res.status(401).send("Unauthorized.Invalid Token!");
    }
  } catch (err) {
    next(err);
  }
};
const verifyIfAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401).send("Unauthorized! Admin required");
    }
  } catch (err) {
    next(err);
  }
};
module.exports = { verifyIfLoggedIn, verifyIfAdmin };
