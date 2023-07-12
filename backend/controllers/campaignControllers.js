const Campaign = require("../models/CampaignModel");
require("dotenv").config();
const cloudinary=require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key:process.env.CLOUD_API ,
  api_secret: process.env.CLOUD_SECRET
});
const getCampaigns = async (req, res, next) => {
  let select = {};
  const currentDate = new Date();
  let searchQuery = req.query.city || "";
  let query = {};
  if (searchQuery) {
    query = { $text: { $search: searchQuery }, endDate: { $gte: currentDate } };
    select = {
      score: { $meta: "textScore" },
    };
  }
  try {
    const campaigns = await Campaign.find(query, select)
      .sort({ score: -1 })
      .orFail();
    if (!campaigns) res.status(404).send("No campaigns in your city");
    res.status(200).send(campaigns);
  } catch (err) {
    next(err);
  }
};
const deleteCampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.findByIdAndDelete({
      _id: req.params.id,
    }).orFail();

    await new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(campaign.image.public_id, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: err.message });
        } else {
          resolve();
        }
      });
    });

    res.status(201).json({ successful: true, cloud: true });
  } catch (err) {
    next(err);
  }
};


const createCampaigns = async (req, res, next) => {
  try {
    const {
      name,
      description,
      city,
      address,
      startDate,
      endDate,
      goal,
      organizer,
      contactEmail,
      contactPhone,
    } = req.body;

    const campaign = new Campaign({
      name,
      description,
      city,
      address,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      goal,
      organizer,
      contactEmail,
      contactPhone,
    });

    const savedCampaign = await campaign.save();
    res.status(201).json({ id: savedCampaign._id });
  } catch (error) {
    next(err);
  }
};
const uploadImage = async (req, res, next) => {
  try {
    const id = req.query.id;
    const fundraiser = await Campaign.findById(id).orFail();
    fundraiser.image.path = req.body.url;
    fundraiser.image.public_id = req.body.public_id;
    await fundraiser.save();
    res.status(201).json({campaign:fundraiser});
  } catch (err) {
    next(err);
  }
};
const getRecentCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({})
      .sort({ createdAt: "desc" })
      .limit(5)
      .select("name goal city startDate endDate");
    res.json(campaigns);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching campaigns" });
  }
};

// Controller function to get a specific campaign by ID
const getCampaignById = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.json(campaign);
  } catch (err) {
    next(err);
  }
};
//npm install googleapis google-auth-library
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const User = require("../models/UserModel");
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.refreshToken,
});
const button = async (req, res) => {
  try {
    const campaignId = req.params.id;
    const name = req.user.name + " " + req.user.lastName;
    const email = req.user.email;
    const campaign = await Campaign.findById(campaignId);
    // Create a new OAuth2 client using your Google API credentials

    const accessToken = await oauth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "meghnakha18@gmail.com",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.refreshToken,
        accessToken: accessToken,
      },
    });
    const frontendURL = process.env.FRONTEND_URL || "http://localhost:3000";
    const rsvpLink = `${frontendURL}/rsvp/${campaign.id}/${email}`;
    const mailOptions = {
      from: "Fundraiser <meghnakha18@gmail.com>",
      to: `${email}`,
      subject: `RSVP Confirmation for ${campaign.name}`,
      text: `Thank you for registering for : ${
        campaign.name
      }!\n\nHere are the details for the campaign:\n- Name: ${
        campaign.name
      }\n- Description: ${campaign.description}\n- City: ${
        campaign.city
      }\n- Address: ${
        campaign.address
      }\n- Date: ${campaign.startDate.toLocaleDateString()}\n- Organizer: ${
        campaign.organizer
      }\n\nTo confirm your attendance, please click on the following link:\n${rsvpLink}`,
    };

    const result = await transport.sendMail(mailOptions);
    res.status(200).json({ result, successful: true });
  } catch (error) {
    // Handle any errors that occur during the RSVP process
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
const getMyEvents = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find({
      attendees: { $elemMatch: { email: req.user.email } },
      endDate: { $lt: new Date() },
    }).select("name goal startDate endDate");
    res.status(200).json(campaigns);
  } catch (err) {
    next(err);
  }
};
const rsvped = async (req, res, next) => {
  try {
    const campaignId = req.body.campaignId;
    const email = req.body.email;

    const campaign = await Campaign.findById(campaignId);
    const user = await User.findOne({ email: email }).orFail();
    if (!campaign) {
      res.status(404).send("Campaign not found");
      return;
    }

    const isAlreadyAttending = campaign.attendees.some(
      (attendee) => attendee.email === email
    );
    if (isAlreadyAttending) {
      res.status(200).send("Email is already attending");
      return;
    }

    campaign.attendees.push({
      name: user.firstname + " " + user.lastName,
      email: email,
    });
    campaign.save();
    res.status(201).json({ campaign: campaign.name });
  } catch (err) {
    next(err);
  }
};

const getAttendedEvents = async (req, res, next) => {
  try {
    const attendedCampaigns = await Campaign.find({
      attendees: { $elemMatch: { email: req.user.email } },
      endDate: { $gt: new Date() },
    }).select("name goal startDate endDate");

    res.status(200).json(attendedCampaigns);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCampaigns,
  getRecentCampaigns,
  getCampaignById,
  createCampaigns,
  button,
  rsvped,
  uploadImage,
  deleteCampaign,
  getMyEvents,
  getAttendedEvents,
};
