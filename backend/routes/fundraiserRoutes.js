const express=require("express");
const router=express.Router();
const {verifyIfLoggedIn, verifyIfAdmin}=require("../middleware/verifyAuthToken")
const {getFundraisers,getFundraiserDetails,startFundraisers,unverifiedFundraisers,verifyFundraiser, uploadImage,deleteImage}=require("../controllers/fundraiserControllers")
router.get("/",getFundraisers);
router.get("/getOne/:id",getFundraiserDetails);
router.use(verifyIfLoggedIn)
router.post("/",startFundraisers);
router.post("/upload",uploadImage);
router.delete("/image/:imagePath/:id",deleteImage);
router.use(verifyIfAdmin)
router.get("/admin/unverified",unverifiedFundraisers)
router.put("/admin/verify/:id",verifyFundraiser);
module.exports=router;