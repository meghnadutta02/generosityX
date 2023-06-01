const ObjectId=require("mongodb").ObjectId;
const fundraisers = [
  {
    _id:new ObjectId("64214bc9ce4062ec41233960"),
    title: "Support Our School",
    description: "Help fund new equipment for our school's sports teams",
    goalAmount: 10000,
    currentAmount: 0,
    creator: {
      name: "John Doe",
      email: "johndoe@example.com",
      phoneNumber: "123-456-7890",
    },
    donations: ["641ea7034c371df75d4ba1c9"],
    endDate: "2023-08-30T00:00:00.000Z",
    image: [
      {
        path: "/images/school.jpg",
      },
    ],
    isVerified: true,
    comments: [],
  },
  {
    _id:new ObjectId("64214bc9ce4062ec41233962"),
    title: "Help Fight Hunger",
    description: "Support local food banks and help those in need",
    goalAmount: 5000,
    currentAmount: 0,
    creator: {
      name: "Jane Smith",
      email: "janesmith@example.com",
      phoneNumber: "123-456-7890",
    },
    donations: ["641ea7034c371df75d4ba1c7"],
    endDate: "2023-09-22T00:00:00.000Z",
    image: [
      {
        path: "/images/food.jpg",
      },
    ],
    isVerified: true,
    comments: [],
  },
  {
    _id:new ObjectId("64214bc9ce4062ec41233964"),
    title: "Help John Get His Tumor Removed",
    description: "John needs to undergo a surgery to remove a tumor. Let's help him raise the funds for the procedure.",
    goalAmount: 95000,
    currentAmount: 0,
    creator: {
      name: "John Smith",
      email: "johnsmith@example.com",
      phoneNumber: "123-456-7890"
    },
    donations: [
      "641ea7034c371df75d4ba1c6"
    ],
    endDate: "2023-10-22T00:00:00.000Z",
    image: [
      {
        path: "/images/tumor.jpg"
      }
    ],
    isVerified: true,
    comments: [],
  },
  {
    _id:new ObjectId("64214bc9ce4062ec41233966"),
    title: "Support Mental Health",
    description: "Raise awareness and funds for mental health research",
    goalAmount: 8000,
    currentAmount:0,
    creator: {
      name: "Alice Lee",
      email: "alicelee@example.com",
      phoneNumber: "123-456-7890",
    },
    donations: ["641ea7034c371df75d4ba1c8"],
    endDate: "2023-11-05T00:00:00.000Z",
    image: [
      {
        path: "/images/mental-health.jpg",
      },
    ],
    isVerified: true,
    comments: [],
  },
  // {
  //   _id: new ObjectId("64214bc9ce4062ec41233967"),
  //   title: "Help Build a School in Africa",
  //   description: "Raise money to build a school in a rural community in Africa",
  //   goalAmount: 50000,
  //   currentAmount: 0,
  //   creator: {
  //   name: "David Jones",
  //   email: "davidjones@example.com",
  //   phoneNumber: "123-456-7890"
  //   },
  //   donations: ["641ea7034c371df75d4ba1c9"],
  //   endDate: "2023-12-31T00:00:00.000Z",
  //   image: [
  //   {
  //   path: "/images/school-in-africa.jpg"
  //   }
  //   ],
  //   isVerified: true,
  //   comments: []
  //   },
  //   {
  //   _id: new ObjectId("64214bc9ce4062ec41233968"),
  //   title: "Support Local Food Banks",
  //   description: "Help provide food to those in need by supporting local food banks",
  //   goalAmount: 10000,
  //   currentAmount: 0,
  //   creator: {
  //   name: "Jennifer Brown",
  //   email: "jenniferbrown@example.com",
  //   phoneNumber: "123-456-7890"
  //   },
  //   donations: [],
  //   endDate: "2023-10-31T00:00:00.000Z",
  //   image: [
  //   {
  //   path: "/images/food-bank.jpg"
  //   }
  //   ],
  //   isVerified: true,
  //   comments: []
  //   },
];
module.exports = fundraisers;
