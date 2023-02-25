const express = require("express");
const router = express.Router();

const User = require("../models/User.model");
const Rating = require("../models/Rating.model");
const Stroll = require("../models/Stroll.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// GET ALL the Strolls
router.get("/", (req, res, next) => {
  Stroll.find()
    .then((strolls) => {
      console.log(res.data);
      res.json(strolls);
    })
    .catch((err) => console.log(err));
});

//*Testing*
// router.get("/", async (req, res, next) => {
//   try {
//     const strolls = await Stroll.find({}, 'city');
//     const cities = strolls.map(stroll => stroll.city);
//     res.json(cities);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

//Create Stroll
router.post("/", async (req, res, next) => {
  try {
    const newStroll = req.body;
    const userId = newStroll.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const stroll = await Stroll.create(newStroll);
    user.stroll.push(stroll._id);
    await user.save();

    // Update the `user` property in the `Stroll` model
    stroll.user = user._id;
    await stroll.save();

    res.json(stroll);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/user/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const strolls = await Stroll.find({ user: userId });
    res.json({ strolls });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// Updated Strolls
// router.put("/:id", async (req, res, next) => {
//     try {
//       const updatedStroll = req.body;
//       const updatedDoc = await Stroll.findByIdAndUpdate(req.params.id, updatedStroll, { new: true });
//       res.json(updatedDoc);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send("Internal Server Error");
//     }
//   });

// Stroll Detail
router.get("/:id", (req, res) => {
  Stroll.findById(req.params.id)
    .then((strolls) => res.json(strolls))
    .catch((err) => console.error(err));
});

// Stroll removed
// router.delete("/:id", async (req, res, next) => {
//     try {
//       const deletedDoc = await Stroll.findByIdAndDelete(req.params.id);
//       if (!deletedDoc) {
//         return res.status(404).send("Document not found");
//       }
//       res.json(deletedDoc);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send("Internal Server Error");
//     }
// });

// Testing
router.delete("/:id", async (req, res, next) => {
  try {
    const deletedDoc = await Stroll.findByIdAndDelete(req.params.id);
    if (!deletedDoc) {
      return res.status(404).send("Document not found");
    }

    // Find the corresponding user and remove the deleted stroll ID from their `stroll` property
    const user = await User.findOne({ stroll: deletedDoc._id });
    if (!user) {
      return res.status(404).send("User not found");
    }
    user.stroll = user.stroll.filter((id) => id !== deletedDoc._id);
    await user.save();

    res.json(deletedDoc);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Add a rating to a stroll
router.put("/:id", async (req, res) => {
  const { rating } = req.body;
  const { id } = req.params;

  try {
    const stroll = await Stroll.findById(id);
    if (!stroll) {
      return res.status(404).json({ message: "Stroll not found" });
    }

    const existingRating = await Rating.findOne({ stroll: id });
    if (existingRating) {
      existingRating.rating = rating;
      await existingRating.save();
      return res.status(200).json(existingRating);
    }

    const newRating = new Rating({
      rating,
      stroll: id,
    });
    await newRating.save();
    res.status(201).json(newRating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
