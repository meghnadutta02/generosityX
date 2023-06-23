const mongoose = require("mongoose");
const MoneyDonation = require("./DonateMoneyModel");

const fundraiserSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    goalAmount: {
      type: Number,
      required: true,
    },
    currentAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    user: { email: { type: String } },
    creator: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
    },
    donations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: MoneyDonation,
        default: null,
      },
    ],
    endDate: {
      type: Date,
      required: true,
    },
    image: [
      {
        path: { type: String, required: false },
        public_id:{type:String,required:false}
      },
    ],
    //certifications
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);
const Fundraiser = mongoose.model("Fundraiser", fundraiserSchema);

module.exports = Fundraiser;
