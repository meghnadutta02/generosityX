const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
const fundraiserRoutes = require("../routes/fundraiserRoutes");
const campaignRoutes = require("../routes/campaignRoutes");
const donationRoutes = require("../routes/donationRoutes");
const userRoutes = require("../routes/userRoutes");
app.get("/logout", (req, res) => {
  return res.clearCookie("access_token").send("access token cleared");
});
app.get("/get-token", (req, res) => {
  try {
    const accessToken =  req.cookies.access_token;
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    return res.json({ token: decoded.name, isAdmin: decoded.isAdmin });
  } catch (err) {
    return res.status(401).send("Unauthorized. Invalid Token");
  }
});
app.use("/fundraisers", fundraiserRoutes);
app.use("/campaigns", campaignRoutes);
app.use("/donations", donationRoutes);
app.use("/users", userRoutes);
module.exports = app;
