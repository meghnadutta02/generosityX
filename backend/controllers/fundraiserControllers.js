const Fundraiser = require("../models/FundraiserModel");
const imageValidate = require("../utils/imageValidate");
const getFundraisers = async (req, res, next) => {
  try {
    const recordsPerPage = 4;
    const totalFundraisers = await Fundraiser.countDocuments({
      isVerified: true,
    });
    const pageNum = Number(req.query.pageNum) || 1;
    const currentDate = new Date();
    const fundraisers = await Fundraiser.find({
      isVerified: true,
      endDate: { $gte: currentDate },
    })
      .populate("donations", "-user -comments -createdAt -updatedAt -__v")
      .sort({ goalAmount: -1 })
      .limit(recordsPerPage)
      .skip(recordsPerPage * (pageNum - 1))
      .orFail();

    for (const fundraiser of fundraisers) {
      let currentAmount = 0;//everytime the page is refreshed
      for (const donation of fundraiser.donations) {
        currentAmount += donation.amount; 
      }
      fundraiser.currentAmount = currentAmount;
      await fundraiser.save();
    }

    res.status(200).json({
      fundraisers: fundraisers,
      pageNum: pageNum,
      paginationLinks: Math.ceil(totalFundraisers / recordsPerPage),
    });
  } catch (err) {
    next(err);
  }
};

const getFundraiserDetails = async (req, res, next) => {
  try {
    const fundraiser = await Fundraiser.findOne({ _id: req.params.id })
      .populate("donations")
      .orFail();
      fundraiser.currentAmount=0;
      fundraiser.donations.map((donation)=>{
        fundraiser.currentAmount+=donation.amount
      })
      await fundraiser.save();
    res.status(200).json(fundraiser);
  } catch (err) {
    next(err);
  }
};
const startFundraisers = async (req, res, next) => {
  try {
    const { title, description, target, deadline, phoneNumber,name,email } = req.body;
    if (!(title && description && target && deadline))
      return res.status(400).send("All input fields are required");
    const fundraiser = await Fundraiser.create({
      title,
      description,
      goalAmount:target,
      endDate:new Date(deadline),
      user:req.user._id,
      creator: {
        name,
        email,
        phoneNumber,
      },
    });
    res.status(201).json({ id: fundraiser._id });
  } catch (err) {
    next(err);
  }
};
const uploadImage = async (req, res, next) => {
  try {
    const id = req.query.id;
    const fundraiser = await Fundraiser.findById(id).orFail();
    fundraiser.image.push({path:req.body.url});
    // if (!req.files || !!req.files.images === false) {
    //   return res.status(400).send("No files were uploaded");
    // }
    // const validateResult = imageValidate(req.files.images);
    // if (validateResult !== null) {
    //   return res.status(400).send(validateResult.error);
    // }
    // const path = require("path");
    // const { v4: uuidv4 } = require("uuid");
    // const uploadDirectory = path.resolve(
    //   __dirname,
    //   "../../frontend/public/images/certifications"
    // );
    // let imagesTable = [];
    // if (Array.isArray(req.files.images)) {
    //   imagesTable = req.files.images;
    // } else {
    //   imagesTable.push(req.files.images);
    // }
    
    
    // imagesTable.map((image) => {
    //   const filename = uuidv4() + path.extname(image.name);
    //   var uploadPath = uploadDirectory + "/" + filename;
    //   fundraiser.image.push({ path: "/images/certifications/" + filename });
    //   image.mv(uploadPath, function (err) {
    //     if (err) res.status(500).send(err);
    //     else res.send("Files uploaded");
    //   });
    // });
    await fundraiser.save();
    res.status(201).send("Images uploaded and fundraiser created");
  } catch (err) {
    next(err);
  }
};
const verifyFundraiser = async (req, res, next) => {
  try {
    await Fundraiser.findOneAndUpdate(
      { _id: req.params.id },
      { isVerified: true }
    );
    res.status(201).json("Verified");
  } catch (err) {
    next(err);
  }
};

const deleteImage = async (req, res, next) => {
  try {
    const imagePath = decodeURIComponent(req.params.imagePath);
    const path = require("path");
    const finalPath =
      path.resolve(__dirname, "../../frontend/public") + imagePath;
    //  /images/certifications/3aeab8b5-2e4e-4ec4-8d22-73ce67fdfb7c.png
    const fs = require("fs");

    fs.unlink(finalPath, (err) => {
      res.status(500).send(err);
    });

    await Fundraiser.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { image: { path: imagePath } } },
      { new: true }
    ).orFail();
    return res.end();
  } catch (err) {
    next(err);
  }
};
const unverifiedFundraisers = async (req, res, next) => {
  try {
    const recordsPerPage = 4;
    const totalFundraisers = await Fundraiser.countDocuments({
      isVerified: false,
    });
    const pageNum = Number(req.query.pageNum) || 1;
    const fundraisers = await Fundraiser.find({ isVerified: true })
      .populate("donations", "-user -comments -createdAt -updatedAt -__v")
      .sort({ goalAmount: -1 })
      .limit(recordsPerPage)
      .skip(recordsPerPage * (pageNum - 1))
      .orFail();
    //fundraisers is an array
    fundraisers.map((fundraiser) => {
      fundraiser.donations.map((donation) => {
        fundraiser.currentAmount += donation.amount;
      });
      fundraiser.save();
    });
    res
      .status(200)
      .json({
        fundraisers: fundraisers,
        pageNum: pageNum,
        paginationLinks: Math.ceil(totalFundraisers / recordsPerPage),
      });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getFundraisers,
  startFundraisers,
  getFundraiserDetails,
  startFundraisers,
  verifyFundraiser,
  uploadImage,
  deleteImage,
  unverifiedFundraisers,
};
