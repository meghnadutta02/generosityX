require("dotenv").config();
const cloudinary=require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key:process.env.CLOUD_API ,
  api_secret: process.env.CLOUD_SECRET
});
const Fundraiser = require("../models/FundraiserModel");

const getFundraisers = async (req, res, next) => {
  try {
    const currentDate = new Date();
    const fundraisers = await Fundraiser.find({
      isVerified: true,
      endDate: { $gte: currentDate },
    })
      .populate("donations", "-user -comments -createdAt -updatedAt -__v")
      .sort({ goalAmount: -1 })

      .orFail();

    for (const fundraiser of fundraisers) {
      let currentAmount = 0; //everytime the page is refreshed
      for (const donation of fundraiser.donations) {
        currentAmount += donation.amount;
      }
      fundraiser.currentAmount = currentAmount;
      await fundraiser.save();
    }

    res.status(200).json({
      fundraisers: fundraisers,
    });
  } catch (err) {
    next(err);
  }
};
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
const rejectFundraiser = async (req, res, next) => {
  try {
    const  {reason}  = req.body;
    if (!reason) {
      return res.status(400).send("Please state reason");
    }

    const fundraiser = await Fundraiser.findOneAndDelete({
      _id: req.params.id,
    }).orFail();
    const email = fundraiser.creator.email;
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

    const mailOptions = {
      from: "Fundraiser <meghnakha18@gmail.com>",
      to: email,
      subject: "Fundraiser Rejection",
      text: `Dear Fundraiser Creator,\n\nWe regret to inform you that your fundraiser has been rejected due to the following reason:\n\n${reason}\n\nTry again.If you have any further questions or concerns, please contact us at your convenience.\n\nBest regards,\nThe Fundraiser Team`,
    };

    const result = await transport.sendMail(mailOptions);
    res.status(200).json({ result, successful: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getFundraiserDetails = async (req, res, next) => {
  try {
    const fundraiser = await Fundraiser.findOne({ _id: req.params.id })
      .populate("donations")
      .orFail();
    fundraiser.currentAmount = 0;
    fundraiser.donations.map((donation) => {
      fundraiser.currentAmount += donation.amount;
    });
    await fundraiser.save();
    res.status(200).json(fundraiser);
  } catch (err) {
    next(err);
  }
};
const startFundraisers = async (req, res, next) => {
  try {
    const { title, description, target, deadline, phoneNumber, name, email } =
      req.body;
    if (!(title && description && target && deadline))
      return res.status(400).send("All input fields are required");
    const fundraiser = await Fundraiser.create({
      title,
      description,
      goalAmount: target,
      endDate: new Date(deadline),
      user: { email: req.user.email },
      creator: {
        name,
        email,
        phoneNumber,
      },
    });
    res.status(201).json({ id: fundraiser._id });
  } catch (err) {
    next(err);
  }
};
const uploadImage = async (req, res, next) => {
  try {
    const id = req.query.id;
    const fundraiser = await Fundraiser.findById(id).orFail();
    fundraiser.image.push({ path: req.body.url,public_id:req.body.public_id });

    await fundraiser.save();
    res.status(201).send("Images uploaded and fundraiser created");
  } catch (err) {
    next(err);
  }
};
const myFundraisers = async (req, res, next) => {
  try {
    const fundraisers = await Fundraiser.find({
      user: { email: req.user.email },
    });
    res.status(200).send(fundraisers);
  } catch (err) {
    next(err);
  }
};
const deleteFundRaiser = async (req, res, next) => {
  try {
    const fundraiser = await Fundraiser.findByIdAndDelete({
      _id: req.params.id,
    }).orFail();
    await Promise.all(
      fundraiser.image.map(
        (image) =>
          new Promise((resolve, reject) => {
            cloudinary.uploader.destroy(image.public_id, (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).json({ message: err.message });
              } else {
                resolve();
              }
            });
          })
      )
    );
    res.status(201).json({ successful: true, cloud: true });
  } catch (err) {
    next(err);
  }
};
const verifyFundraiser = async (req, res, next) => {
  try {
    const fundraiser = await Fundraiser.findOneAndUpdate(
      { _id: req.params.id },
      { isVerified: true }
    );

    const email = fundraiser.creator.email;
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

    const mailOptions = {
      from: "Fundraiser <meghnakha18@gmail.com>",
      to: email,
      subject: "Fundraiser Verification",
      html: `<p>Dear Fundraiser Creator,</p>
         <p>Congratulations! Your fundraiser: <strong>${fundraiser.title}</strong> has been successfully verified.</p>
         <p>Thank you for making a positive impact through your campaign.</p>
         <p>Best regards,</p>
         <p>The Fundraiser Team</p>`,
    };

    const result = await transport.sendMail(mailOptions);
    res.status(201).json({ result, message: "Verified" });
  } catch (err) {
    next(err);
  }
};

const unverifiedFundraisers = async (req, res, next) => {
  try {
    const fundraisers = await Fundraiser.find({ isVerified: false })
    .sort({ createdAt: -1 })
      .populate("donations", "-user -comments -createdAt -updatedAt -__v")
      .orFail();
    res.status(200).json({
      fundraisers: fundraisers,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getFundraisers,
  startFundraisers,
  getFundraiserDetails,
  startFundraisers,
  verifyFundraiser,
  uploadImage,
  myFundraisers,
  deleteFundRaiser,
  rejectFundraiser,
  unverifiedFundraisers,
};
