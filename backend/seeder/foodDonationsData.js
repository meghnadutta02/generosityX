const foodDonations = [
  {
    user: "61f8c60ae81c000000000000",
    event: "Community potluck",
    description: "Donated homemade lasagna and garlic bread",
    images: [{ path: "https://example.com/food-donation-3.jpg" }],
    pickupAddress: {
      street: "456 Elm St",
      city: "Los Angeles",
      postal: "90002",
      country: "USA",
      state: "CA",
    },
  },
  {
    user: "61f8c60ae81c000000000004",
    event: "Thanksgiving dinner",
    description: "Donated a cooked turkey and sides",
    images: [{ path: "https://example.com/food-donation-4.jpg" }],
    pickupAddress: {
      street: "10 Park Ave",
      city: "New York",
      postal: "10002",
      country: "USA",
      state: "NY",
    },
  },
  {
    user: "61f8c60ae81c000000000003",
    event: "School food drive",
    description: "Donated 100 cans of soup and vegetables",
    images: [
      { path: "https://example.com/food-donation-5.jpg" },
      { path: "https://example.com/food-donation-6.jpg" },
    ],
    pickupAddress: {
      street: "789 Wacker Dr",
      city: "Chicago",
      postal: "60602",
      country: "USA",
      state: "IL",
    },
  },
  {
    user: "61f8c60ae81c000000000001",
    pickupAddress: {
      street: "123 Main St",
      city: "New York",
      postal: "10001",
      country: "USA",
      state: "NY",
    },
    event: "Community picnic",
    description: "Donated hot dogs and buns",
    images: [{ path: "https://example.com/food-donation-13.jpg" }],
  },
  {
    user: "61f8c60ae81c000000000002",
    pickupAddress: {
      street: "456 Elm St",
      city: "Los Angeles",
      postal: "90001",
      country: "USA",
      state: "CA",
    },

    event: "School fundraiser",
    description: "Donated homemade cookies and brownies",
    images: [{ path: "https://example.com/food-donation-14.jpg" }],
  },
  {
    user: "61f8c60ae81c000000000003",
    pickupAddress:{
      street: "789 Oak St",
      city: "Chicago",
      postal: "60601",
      country: "USA",
      state: "IL",
    },
    event: "Community food drive",
    description: "Donated canned goods and pasta",
    images: [{ path: "https://example.com/food-donation-15.jpg" }],
  },
];

module.exports = foodDonations;
