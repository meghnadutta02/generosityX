const express=require("express");
const router=express.Router();
const {verifyIfLoggedIn, verifyIfAdmin}=require("../middleware/verifyAuthToken")
const {getFundraisers,getFundraiserDetails,deleteFundRaiser,startFundraisers,unverifiedFundraisers,verifyFundraiser, uploadImage,myFundraisers}=require("../controllers/fundraiserControllers")
router.get("/",getFundraisers);
router.get("/getOne/:id",getFundraiserDetails);
router.use(verifyIfLoggedIn)
router.post("/",startFundraisers);
router.delete("/delete/:id",deleteFundRaiser);
router.post("/upload",uploadImage);
router.get("/myfundraisers",myFundraisers)
router.use(verifyIfAdmin)
router.get("/admin/unverified",unverifiedFundraisers)
router.put("/admin/verify/:id",verifyFundraiser);
module.exports=router;