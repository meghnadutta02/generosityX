const express=require("express");
const router=express.Router();
const {verifyIfLoggedIn,verifyIfAdmin}=require("../middleware/verifyAuthToken");
const {getUsers,registerUser,loginUser,updateUserProfile,getUserProfile} = require("../controllers/userControllers"); 
router.post("/register",registerUser)
router.post("/login",loginUser)
//user logged in routes
router.use(verifyIfLoggedIn)
router.put("/profile",updateUserProfile);//using the form
router.get("/profile/:id",getUserProfile);
//admin routes
router.use(verifyIfAdmin)
router.get("/",getUsers)

module.exports=router;