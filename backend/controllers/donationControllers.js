require("dotenv").config();
const stripe = require("stripe")(
  "sk_test_51NERLdSFxAjVW5eEGmmD0prvR7tqz32KyK8OtR33zPfHyuGCBR7C21XeRk59y7Y86FQ7NxnCcWPJm5F8knbhnTni00Ki3nUhuH"
);
const DonateFood = require("../models/DonateFoodModel");
const DonateItem = require("../models/DonateItemModel");
const DonateMoney = require("../models/DonateMoneyModel");
const Fundraiser = require("../models/FundraiserModel");
const imageValidate = require("../utils/imageValidate");

const getmyDonations = async (req, res, next) => {
  //make a carousel for this
  try {
    const moneydonations = await DonateMoney.find({
      email: req.user.email,
    })
      .populate("donatedTo", "title description")
      .sort({ createdAt: -1 });
    const fooddonations = await DonateFood.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    const itemdonations = await DonateItem.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      moneydonations: moneydonations,
      fooddonations: fooddonations,
      itemdonations: itemdonations,
    });
  } catch (err) {
    next(err);
  }
};
const requestPayment = async (req, res, next) => {
  try {
    const { name, amount } = req.body;
    const payment = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "USD",
      description: "donation",
      shipping: {
        address: {
          line1: "123 Main St",
          city: "San Francisco",
          postal_code: "94105",
          state: "CA",
          country: "US",
        },
        name: name,
      },
    });
    console.log("Requesting user to pay " + amount);
    res.status(201).json({ clientSecret: payment.client_secret });
  } catch (err) {
    console.log("Error:", err);
    next(err);
  }
};
const item = async (req, res, next) => {
  try {
    const itemdonation = await DonateItem.findOne({ _id: req.params.id }).orFail();
    res.status(200).json(itemdonation);
  } catch (err) {
    next(err);
  }
};
const donateMoney = async (req, res, next) => {
  try {
    const { name, email, phoneNumber, amount, comments } = req.body;
    const id = req.params.id;
    const donation = new DonateMoney();
    donation.user = req.user
      ? req.user.name + " " + req.user.lastName
      : "Anonymous";
    donation.amount = amount;
    donation.comments = comments || donation.comments;
    donation.name = name;
    donation.phoneNumber = phoneNumber;
    donation.email = req.user.email || email;
    const fundraiser = await Fundraiser.findOne({ _id: id });
    fundraiser.donations.push(donation._id);
    donation.donatedTo = fundraiser.id;
    donation.save();
    fundraiser.save();
    res.status(201).json({ successful: true, donation_id: donation._id });
  } catch (err) {
    next(err);
  }
};
const imageUpload = async (req, res, next) => {
  try {
    const type = req.query.type;
    const id = req.params.id;
    if (type === "item") {
      const item = await DonateItem.findById(id).orFail();
      item.images.push(req.body.url);
      await item.save();
      res.status(201).json({ item: item });
    } else {
      const food = await DonateFood.findById(id).orFail();
      food.images.push(req.body.url);
      await food.save;
    }
  } catch (err) {
    throw err;
  }
};

const donate = async (req, res, next) => {
  try {
    if (req.query.type === "item") {
      try {
        const { category, description, city, country, postal, state, street } =
          req.body;

        const donation = new DonateItem();

        donation.user = req.user._id;
        donation.category = category;
        donation.description = description;
        donation.pickupAddress.city = city;
        donation.pickupAddress.country = country;
        donation.pickupAddress.postal = postal;
        donation.pickupAddress.state = state;
        donation.pickupAddress.street = street;
        donation.save();
        res.status(201).json({ id: donation._id });
      } catch (err) {
        next(err);
      }
    } else {
      try {
        const { event, description, city, country, postal, state, street } =
          req.body;
        if (!(event && description))
          return res.status(400).send("All input fields are required");
        if (!req.files || !!req.files.images === false) {
          return res.status(400).send("No files were uploaded");
        }

        const donation = new DonateFood();
        await imageUpload(req.query.type, req.files.images, donation);

        donation.user = req.user._id;
        donation.event = event;
        donation.description = description;
        donation.pickupAddress.city = city;
        donation.pickupAddress.country = country;
        donation.pickupAddress.postal = postal;
        donation.pickupAddress.state = state;
        donation.pickupAddress.street = street;
        donation.save();
        res.status(201).json({ donation, donation_id: donation._id });
      } catch (err) {
        next(err);
      }
    }
  } catch (err) {
    next(err);
  }
};

const deleteItemImage = async (req, res, next) => {
  try {
    const imagePath = decodeURIComponent(req.params.imagePath);
    const path = require("path");
    const finalPath =
      path.resolve(__dirname, "../../frontend/public") + imagePath;
    const fs = require("fs");

    fs.unlink(finalPath, (err) => {
      res.status(500).send(err);
    });

    await DonateItem.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { $pull: { images: imagePath } },
      { new: true }
    ).orFail();
    return res.end();
  } catch (err) {
    next(err);
  }
};
const getDonationDetails = async (req, res, next) => {
  try {
    const donationId = req.params.id;
    const donations = await Promise.all([
      DonateItem.findOne({ _id: donationId }),
      DonateMoney.findOne({ _id: donationId }).populate(
        "donatedTo",
        "title description"
      ),
      DonateFood.findOne({ _id: donationId }),
    ]);

    if (!donations) {
      return res.status(404).json({ message: "Donation not found" });
    }
    const donation = donations.filter((item) => item != null);
    res.status(200).json(donation[0]);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getmyDonations,
  donateMoney,
  donate,
  getDonationDetails,
  deleteItemImage,
  requestPayment,
  item,
  imageUpload,
};
