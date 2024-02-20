const express = require("express");
const multer = require("multer");
const { default: User } = require("../models/UserModel");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "user-uploads/"); // destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // set filename
  },
});

const upload = multer({ storage: storage, limits: 1000000 * 5 });

// API to upload image
router.post("/image-upload", upload.single("image"), async (req, res) => {
  try {
    const { filename } = req.file;
    const { name } = req.body;
    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.status(401).send({ errMsg: "Something went wrong!" });
    }

    const newImage = new Image({ user: user._id, name, filename });
    await newImage.save();

    res.status(201).send("Image uploaded successfully!");
  } catch (error) {
    console.log(error);
    res.status(500).send({ errMsg: "Internal Error Occurred!" });
  }
});

// API to get all uploaded images by the current user
router.get("/my-images", async (req, res) => {
  try {
    const userImage = await Image.find({ user: req.session.userId });
    res.status(200).json(userImage);
  } catch (error) {
    console.log(error);
    res.status(500).send({ errMsg: "Internal Error Occurred!" });
  }
});

module.exports = router;
