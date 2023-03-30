const mongoose = require("mongoose");
const Fundraiser = require("./FundraiserModel");
const donationSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    comments: {
      type: String,
      required: false,
    },
    donatedTo:
    {
      type: mongoose.Schema.Types.ObjectId,
      required:true,
      ref:'Fundraiser',
    }
  },
  { timestamps: true }
);

const MoneyDonation = mongoose.model("MoneyDonation", donationSchema);

module.exports = MoneyDonation;
