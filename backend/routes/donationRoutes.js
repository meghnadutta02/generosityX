const express=require("express");
const router=express.Router();
const {verifyIfLoggedIn,verifyIfAdmin}=require("../middleware/verifyAuthToken");
const {getmyDonations,requestPayment,deleteProduct,donateMoney,item,food,getDonationDetails,deleteItemImage,donate,imageUpload}=require("../controllers/donationControllers")
router.use(verifyIfLoggedIn);
router.get("/",getmyDonations);
router.post("/image/:id",imageUpload);
router.post("/donate",donate);
router.delete("/delete/:id",deleteProduct)
router.get("/item/:id",item);
router.get("/food/:id",food);
router.post("/donate/money/:id",donateMoney);
router.post("/request/money/:id",requestPayment);
router.get("/:id",getDonationDetails);
module.exports=router;