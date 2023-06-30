const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    image: 
      {
        path: { type: String, required: false },
        public_id:{type:String,required:false}
      },
    goal: { type: String, required: true },
    organizer: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
    attendees: {
      type: [{
        name: { type: String, required: true },
        email: { type: String, required: true }
      }],
      default: []
    },
  },
  { timestamps: true }
);
campaignSchema.index({ createdAt: -1 });
campaignSchema.index({ name: "text", city: "text" }, { name: "TextIndex" });
campaignSchema.index({ goal: -1 });
const Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;
