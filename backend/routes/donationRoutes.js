const express=require("express");
const router=express.Router();
const {verifyIfLoggedIn,verifyIfAdmin}=require("../middleware/verifyAuthToken");
const {getmyDonations,requestPayment,donateMoney,donateItem,donateFood,getDonationDetails,deleteItemImage,donate}=require("../controllers/donationControllers")
router.use(verifyIfLoggedIn);
router.get("/",getmyDonations);
router.put("/donate/item/:imagePath/:id",deleteItemImage);
router.post("/donate",donate);
router.post("/donate/money/:id",donateMoney);
router.post("/request/money/:id",requestPayment);
router.get("/:id",getDonationDetails);
module.exports=router;