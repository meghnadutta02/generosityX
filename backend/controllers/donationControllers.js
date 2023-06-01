const DonateFood = require("../models/DonateFoodModel");
const DonateItem = require("../models/DonateItemModel");
const DonateMoney = require("../models/DonateMoneyModel");
const Fundraiser = require("../models/FundraiserModel");
const imageValidate = require("../utils/imageValidate");
const getmyDonations = async (req, res, next) => {
  //make a carousel for this
  try {
    const moneydonations = await DonateMoney.find({
      user: req.user.name + " " + req.user.lastName,
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
const donateMoney = async (req, res, next) => {
  try {
    const { name,email,phoneNumber,amount, comments } = req.body;
    const id = req.params.id;
    const donation = new DonateMoney();
    donation.user = req.user.name + " " + req.user.lastName;
    donation.amount = amount;
    donation.comments = comments || donation.comments;
    donation.name=name;
    donation.phoneNumber=phoneNumber;
    donation.email=req.user.email || email;
    const fundraiser = await Fundraiser.findOne({ _id: id });
    fundraiser.donations.push(donation._id);
    donation.donatedTo = fundraiser.id;
    donation.save();
    fundraiser.save();
    res.status(201).json({ successful:true, donation_id: donation._id });
  } catch (err) {
    next(err);
  }
};
const imageUpload = async (type, images, donation) => {
  try {
    const validateResult = imageValidate(images);
    if (validateResult !== null) {
      throw new Error(validateResult.error);
    }
    const path = require("path");
    const { v4: uuidv4 } = require("uuid");
    const uploadDirectory =
      path.resolve(__dirname, "../../frontend/public/images/") +
      (type === "item" ? "/donatedItems" : "/donatedFood");
    let imagesTable = [];
    if (Array.isArray(images)) {
      imagesTable = images;
    } else {
      imagesTable.push(images);
    }
    const promises = imagesTable.map((image) => {
      const filename = uuidv4() + path.extname(image.name);
      const uploadPath = uploadDirectory + "/" + filename;
      donation.images.push({
        path:
          "/images/" +
          (type === "item" ? "donatedItems" : "donatedFood") +
          "/" +
          filename,
      });
      return new Promise((resolve, reject) => {
        image.mv(uploadPath, function (err) {
          if (err) reject(err);
          else resolve();
        });
      });//By wrapping it in a Promise, we can use async/await syntax to wait for the function to complete before moving on to the next step.
    });
    //promise takes an array as an argument(iterable objects)
    await Promise.all(promises);
    return donation;
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
        if (!(category && description))
          return res.status(400).send("All input fields are required");
        if (!req.files || !!req.files.images === false) {
          return res.status(400).send("No files were uploaded");
        }

        const donation = new DonateItem();
        await imageUpload(
          req.query.type,
          req.files.images,
          donation
        );

        donation.user = req.user._id;
        donation.category = category;
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
         await imageUpload(
          req.query.type,
          req.files.images,
          donation
        );

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
};
