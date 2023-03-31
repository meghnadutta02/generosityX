const Campaign = require("../models/CampaignModel");
// *Useful for getting environment vairables
require("dotenv").config();
const getCampaigns = async (req, res, next) => {
  let select = {};
  let searchQuery = req.query.city || "";
  let query = {};
  if (searchQuery) {
    query = { $text: { $search: searchQuery } };
    select = {
      score: { $meta: "textScore" },
    };
  }
  try {
    const campaigns = await Campaign.find(query, select)
      .sort({ score: -1 })
      .orFail()
      .select("name goal city startDate endDate");
<<<<<<< HEAD
      res.status(200).send(campaigns
      );
=======
    res.status(200).send(campaigns);
>>>>>>> c30031eedcd283a05fcd027595edb2aaadc3c9d1
  } catch (err) {
    next(err);
  }
};

//can only be created by admins
const createCampaigns = async (req, res, next) => {
  try {
    const {
      name,
      description,
      city,
      address,
      startDate,
      endDate,
      image,
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
      startDate,
      endDate,
      image,
      goal,
      organizer,
      contactEmail,
      contactPhone,
    });

    const savedCampaign = await campaign.save();
    res.status(201).json(savedCampaign);
  } catch (error) {
    next(err);
  }
};

const getRecentCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({})
      .sort({ createdAt: "desc" })
      .limit(5)
      .select("name goal startDate endDate");
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
    const rsvpLink = `http://localhost:5000/api/campaigns/rsvp/${campaign.id}/${email}`;
    const mailOptions = {
      from: "Fundraiser <meghnakha18@gmail.com>",
      to: `${email}`,
      subject: `RSVP Confirmation for ${campaign.name}`,
      text: `Thank you for registering for ${
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
    res.status(200).json(result);
  } catch (error) {
    // Handle any errors that occur during the RSVP process
    console.error(error);
    res.status(500).json({ message: "Failed to send RSVP." });
  }
};
const getMyEvents = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find({
      attendees: { $elemMatch: { email: req.user.email } },
    }).select("name goal startDate endDate");
    res.status(200).json(campaigns);
  } catch (err) {
    next(err);
  }
};
const rsvped = async (req, res, next) => {
  try {
    const campaignId = req.params.campaignId;
    const email = req.params.email;
    const name = req.params.name;
    // find the campaign by id
    const campaign = await Campaign.findById(campaignId);
    const user = await User.findOne({ email: email }).orFail();
    if (!campaign) {
      res.status(404).send("Campaign not found");
      return;
    }

    // add the attendee to the attendees array
    campaign.attendees.push({
      name: user.firstname + " " + user.lastName,
      email: email,
    });
    campaign.save();
    res.send("RSVP confirmed");
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
  getMyEvents,
};
