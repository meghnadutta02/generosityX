const express=require("express");
const router=express.Router();
const {verifyIfLoggedIn,verifyIfAdmin}=require("../middleware/verifyAuthToken");
const {getCampaigns,getRecentCampaigns,getCampaignById,uploadImage,createCampaigns,button,getMyEvents,getAttendedEvents, deleteCampaign}=require("../controllers/campaignControllers")

router.get("/search",getCampaigns);
router.get("/recent",getRecentCampaigns);
router.get("/getOne/:id",getCampaignById)
router.use(verifyIfLoggedIn)
router.get("/myevents",getMyEvents);
router.get("/attendedEvents",getAttendedEvents)
router.post("/attend/:id",button);

router.use(verifyIfAdmin)
router.post("/upload",uploadImage);
router.delete("/delete/:id",deleteCampaign);
router.post("/create",createCampaigns);
module.exports=router;