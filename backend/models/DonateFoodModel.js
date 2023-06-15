const mongoose = require("mongoose");
const User = require("./UserModel");
const foodDonationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: User,
    },
    pickupAddress: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postal: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
    },
    quantity:
    {
      type: String,
      required:true,
      
    },
    description: {
      type: String,
      required: false,
    },
    images: [
      {
        path: { type: String, required: false },
      },
    ],
  },
  { timestamps: true }
);

const FoodDonation = mongoose.model("FoodDonation", foodDonationSchema);

module.exports = FoodDonation;
