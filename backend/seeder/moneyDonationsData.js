const ObjectId=require("mongodb").ObjectId;
const moneyDonations = [
  
    {
      _id:new ObjectId("641ea7034c371df75d4ba1c6"),
      user: "John Doe",
      name: "John Doe",
      amount: 1000,
      comments: "Keep up the good work!",
      donatedTo:new ObjectId("64214bc9ce4062ec41233964")
    },
    {
      _id:new ObjectId("641ea7034c371df75d4ba1c7"),
      user: "Jane Doe",
      name: "Jane Doe",
      amount: 500,
      comments: "Happy to support this cause!",
      donatedTo:new ObjectId("64214bc9ce4062ec41233962")
    },
    {
      _id:new ObjectId("641ea7034c371df75d4ba1c8"),
      user: "Emily Lee",
      name: "Emily Lee",
      amount: 150,
      comments: "Wishing you all the best.",
      donatedTo:new ObjectId("64214bc9ce4062ec41233966")
    },
    {
      _id:new ObjectId("641ea7034c371df75d4ba1c9"),
      user: "Sophia Rodriguez",
      name: "Sophia Rodriguez",
      amount: 1500,
      comments: "Every little bit helps!",
      donatedTo:new ObjectId("64214bc9ce4062ec41233960")
    }
];
module.exports = moneyDonations;
