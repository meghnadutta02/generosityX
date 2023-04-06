const User = require("../models/UserModel");
const Review = require("../models/ReviewModel");
const { hashPassword, comparePasswords } = require("../utils/hashPassword");
const { generateAuthToken } = require("../utils/generateAuthToken");
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password").orFail();
    return res.json(users);
  } catch (err) {
    next(err);
  }
};
const registerUser = async (req, res, next) => {
  try {
    const { firstname, lastName, email, password, phoneNumber } = req.body;
    if (!firstname || !lastName || !email || !password || !phoneNumber)
     return res.status(400).send("All input fields are required");
    const hashedPassword = hashPassword(password);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format!" });
    }
    
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(400).json({ error: "User already exists!" });
    } else {
      const user = await User.create({
        firstname,
        lastName,
        email: email.toLowerCase(),
        password: hashedPassword,
        phoneNumber
      });
      //cookies are being stored here to see if a user is logged in:
      //They are commonly used for session management, user authentication, personalization, tracking, and other purposes.
      //user authentication:npm i jsonwebtoken
      res
        .cookie(
          "access_token",
          generateAuthToken(
            user._id,
            user.firstname,
            user.lastName,
            user.email,
            user.isAdmin
          ),
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          }
        )
        .status(201)
        .json({
          
            _id: user._id,
            name: user.firstname,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
        
        });
    }
  } catch (err) {
    next(err);
  }
};
const loginUser = async (req, res, next) => {
  try {
    const { email, password, doNotLogout } = req.body;
    if (!email || !password)
      res.status(400).send("All input fields are required");
    const user = await User.findOne({ email: email }).orFail();
    if (user && comparePasswords(password, user.password)) {
      let cookieParams = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      };
      if (doNotLogout) {
        cookieParams = { ...cookieParams, maxAge: 1000 * 60 * 60 * 24 * 7 };
      } //1000ms=1s..user will remain logged in for 7 days
      return res
        .cookie(
          "access_token",
          generateAuthToken(
            user._id,
            user.firstname,
            user.lastName,
            user.email,
            user.isAdmin,
          ),
          cookieParams
        )
        .status(200)
        .json({
          sucess: "user logged in",
          userLoggedIn: {
            _id: user._id,
            name: user.firstname,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            doNotLogout,
          },
        });
    } else {
      res.status(401).json({error:"Wrong Credentials"});
    }
  } catch (err) {
    next(err);
  }
};
//for the form
const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();
    user.firstname = req.body.firstname || user.firstname;
    user.lastName = req.body.lastName || user.lastName;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.address = req.body.address;
    user.country = req.body.country;
    user.zipCode = req.body.zipCode;
    user.city = req.body.city;
    user.state = req.body.state;
    if (!comparePasswords(req.body.password, user.password)) {
      user.password = hashPassword(req.body.password);
    }
    await user.save();
    res.status(201).json({
      success: "user updated",
      userUpdated: {
        _id: user._id,
        name: user.firstname,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    next(err);
  }
};
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();
    return res.send(user);
  } catch (err) {
    next(err);
  }
};
module.exports={getUsers,registerUser,loginUser,getUserProfile,updateUserProfile}