const connect = require("../config/db");
connect();
const campaignsData = require("./campaignsData");
const foodDonationsData = require("./foodDonationsData");
const reviewData = require("./reviewData");
const fundraisersData = require("./fundraisersData");
const itemDonationsData = require("./ItemDonationsData");
const moneyDonationsData = require("./moneyDonationsData");
const userData = require("./userData");
const DonateFood = require("../models/DonateFoodModel");
const DonateItem = require("../models/DonateItemModel");
const DonateMoney = require("../models/DonateMoneyModel");
const Campaign = require("../models/CampaignModel");
const Review = require("../models/ReviewModel");
const User = require("../models/UserModel");
const Fundraiser = require("../models/FundraiserModel");
const importData = async () => {
  try {
    await Campaign.collection.dropIndexes();
    await Campaign.collection.deleteMany({});
    await DonateFood.collection.deleteMany({});
    await DonateMoney.collection.deleteMany({});
    await DonateItem.collection.deleteMany({});
    await Review.collection.deleteMany({});
    await User.collection.deleteMany({});
    await Fundraiser.collection.deleteMany({});
    await Campaign.insertMany(campaignsData);
    await User.insertMany(userData);
    await DonateFood.insertMany(foodDonationsData);
    await DonateItem.insertMany(itemDonationsData);
    await DonateMoney.insertMany(moneyDonationsData);
    await Review.insertMany(reviewData);
    await Fundraiser.insertMany(fundraisersData);
    console.log("Seeder data imported successfully");
    process.exit();
  } catch (err) {
    console.error("Error while processing seeder data", err);
    process.exit(1);
  }
};
importData();
