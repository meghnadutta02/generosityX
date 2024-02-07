require("dotenv").config();
const stripe = require("stripe")(
  "sk_test_51NERLdSFxAjVW5eEGmmD0prvR7tqz32KyK8OtR33zPfHyuGCBR7C21XeRk59y7Y86FQ7NxnCcWPJm5F8knbhnTni00Ki3nUhuH"
);
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
});
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
    const itemdonation = await DonateItem.findOne({
      _id: req.params.id,
    }).orFail();
    res.status(200).json(itemdonation);
  } catch (err) {
    next(err);
  }
};
const food = async (req, res, next) => {
  try {
    const fooddonation = await DonateFood.findOne({
      _id: req.params.id,
    }).orFail();
    res.status(200).json(fooddonation);
  } catch (err) {
    next(err);
  }
};
const deleteProduct = async (req, res, next) => {
  try {
    if (req.query.type === "food") {
      const fooddonation = await DonateFood.findByIdAndDelete({
        _id: req.params.id,
      }).orFail();
      await Promise.all(
        fooddonation.images.map(
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
    } else if (req.query.type === "item") {
      const itemdonation = await DonateItem.findByIdAndDelete({
        _id: req.params.id,
      }).orFail();
      await Promise.all(
        itemdonation.images.map(
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
    }
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
      item.images.push({ path: req.body.url, public_id: req.body.public_id });
      await item.save();
      res.status(201).json({ item: item });
    } else if (type === "food") {
      const food = await DonateFood.findById(id).orFail();
      food.images.push({ path: req.body.url, public_id: req.body.public_id });
      await food.save();
      res.status(201).json({ food: food });
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
    } else if (req.query.type === "food") {
      try {
        const { quantity, description, city, country, postal, state, street } =
          req.body;
        if (!(quantity && description))
          return res.status(400).send("All input fields are required");

        const donation = new DonateFood();

        donation.user = req.user._id;
        donation.quantity = quantity;
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
    }
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
  food,
  deleteProduct,
  getDonationDetails,
  requestPayment,
  item,
  imageUpload,
};
