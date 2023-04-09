const express=require("express");
const router=express.Router();
const {verifyIfLoggedIn,verifyIfAdmin}=require("../middleware/verifyAuthToken");
const {getCampaigns,getRecentCampaigns,getCampaignById,createCampaigns,button,getMyEvents,rsvped}=require("../controllers/campaignControllers")

router.get("/search",getCampaigns);
router.get("/recent",getRecentCampaigns);
router.get("/getOne/:id",getCampaignById)
router.use(verifyIfLoggedIn)
router.get("/myevents",getMyEvents);
router.post("/attend/:id",button);
// router.post("/rsvp/:campaignId/:email",rsvped)
router.use(verifyIfAdmin)
router.post("/create",createCampaigns);
module.exports=router;