const mongoose = require("mongoose");
const Fundraiser = require("./FundraiserModel");
const donationSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    name:
    {
      required: true,
      type:String,
    },
    amount: {
      type: Number,
      required: true,
    },
    comments: {
      type: String,
      required: false,
    },
    phoneNumber:
    {
      type:Number
    },
    email:
    {
      type:String
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
