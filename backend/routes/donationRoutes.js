const express=require("express");
const router=express.Router();
const {verifyIfLoggedIn,verifyIfAdmin}=require("../middleware/verifyAuthToken");
const {getmyDonations,requestPayment,donateMoney,item,getDonationDetails,deleteItemImage,donate,imageUpload}=require("../controllers/donationControllers")
router.use(verifyIfLoggedIn);
router.get("/",getmyDonations);
router.post("/image/:id",imageUpload);
router.post("/donate",donate);
router.get("/item/:id",item)
router.post("/donate/money/:id",donateMoney);
router.post("/request/money/:id",requestPayment);
router.get("/:id",getDonationDetails);
module.exports=router;