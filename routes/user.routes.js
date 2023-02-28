const express = require("express");
const router = express.Router();
const Rating = require("../models/Rating.model");
const Stroll = require("../models/Stroll.model");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
// Update User
router.put("/users", isAuthenticated, (req, res, next) => {
  const { profilePicture } = req.body;
  const userId = req.payload._id;
  User.findByIdAndUpdate(userId, { profilePicture }, { new: true })
    .then(({ __id, email, username, country, city, profilePicture }) =>
      res.json({ __id, email, username, country, city, profilePicture })
    )
    .catch((err) => console.error(err));
});
// Get all the users
router.get("/users", isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and is made available on `req.payload`
  console.log(`req.payload`, req.payload);
  // Send back the token payload object containing the user data
  res.status(200).json(req.payload);
});
// Push to list an Stroll Id (FAVORITES)
router.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log("quiero saber userId:", userId);
  const { strollId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let objectId;
    try {
      objectId = strollId;
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Invalid strollId" });
    }
    if (user.list.includes(objectId)) {
      return res.status(400).json({ message: "Stroll already in list" });
    }
    user.list.push(objectId); // <----------------------------------------------------- Goal!
    await user.save();
    const populatedUser = await User.findById(userId).populate("list");
    res.status(200).json(populatedUser);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
//remove a Stroll from the favorites
router.delete("/users/:userId/:strollId", async (req, res) => {
  const { userId, strollId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const index = user.list.indexOf(strollId);
    if (index < 0) {
      return res.status(404).json({ message: "Stroll not found in list" });
    }
    user.list.splice(index, 1);
    await user.save();
    const populatedUser = await User.findById(userId).populate("list");
    res.status(200).json(populatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
// Get user by ID including their list of favorite strolls
router.get("/users/:userId", isAuthenticated, async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId).populate("list");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
//Pus the strollId into the stroll property of the user model
router.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { strollId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.stroll.includes(strollId)) {
      return res.status(400).json({ message: "Stroll already in list" });
    }
    user.stroll.push(strollId);
    await user.save();
    const populatedUser = await User.findById(userId).populate("stroll");
    res.status(200).json(populatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//test axel




module.exports = router;
