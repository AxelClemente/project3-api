const express = require("express");
const router = express.Router();

const User = require("../models/User.model");
const Rating = require("../models/Rating.model");
const Stroll = require("../models/Stroll.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");


// GET ALL the Strolls
router.get("/", (req, res, next) => {
    Stroll.find()
    .then(strolls =>{
        console.log(res.data);
        res.json(strolls);
    })
    .catch(err => console.log(err))
})

// Create Strolls
// router.post("/", async (req, res, next) => {
//   try {

//     const newStroll = req.body;
//     // console.log("This is the new stroll:",newStroll)
    
//     const stroll = await Stroll.create(newStroll);
//     console.log("This is the new stroll after using create:",stroll)

//     const userId = req.body.userId;
//     console.log("testing userId:",userId)


//    // Now add the Id value of the new object to other model: User - property: stroll
//     const user = await User.findById(userId);
//     console.log("testing user:",user)
//     user.stroll.push(stroll._id);
//     await user.save();

//   // Response to client!
//     res.json(stroll);
//     console.log("Quiero saber esta info ",stroll)

//   } catch (error) {
//     console.log(error);
//   }
// });


// Edit a Stroll
// router.put("/:id/edit", isAuthenticated, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description, city, duration, distance, budget, guide, country,description1, description2, description3, description4, description5, description6, stops1, stops2, stops3, stops4, stops5, stops6 } = req.body;

//     console.log("Updating stroll with ID:", id);
//     console.log("New data:", req.body);

//     // Find the stroll by ID
//     const stroll = await Stroll.findById(id);

//     // If stroll not found, return error response
//     if (!stroll) {
//       console.log("Stroll not found with ID:", id);
//       return res.status(404).json({ message: "Stroll not found" });
//     }

//     // Check if user is the owner of the stroll
//     if (req.user.id !== stroll.user.toString()) {
//       console.log("User not authorized to edit stroll with ID:", id);
//       return res.status(403).json({ message: "You are not authorized to edit this stroll" });
//     }

//     // Update the stroll with the new data
//     stroll.title = title || stroll.title;
//     stroll.country = country || stroll.country;
//     stroll.description = description || stroll.description;
//     stroll.description1 = description1 || stroll.description1;
//     stroll.description2 = description2 || stroll.description2;
//     stroll.description3 = description3 || stroll.description3;
//     stroll.description4 = description4 || stroll.description4;
//     stroll.description5 = description5 || stroll.description5;
//     stroll.description6 = description6 || stroll.description6;
//     stroll.stops1 = stops1 || stroll.stops1;
//     stroll.stops2 = stops2 || stroll.stops2;
//     stroll.stops3 = stops3 || stroll.stops3;
//     stroll.stops4 = stops4 || stroll.stops4;
//     stroll.stops5 = stops5 || stroll.stops5;
//     stroll.stops6 = stops6 || stroll.stops6;
//     stroll.city = city || stroll.city;
//     stroll.duration = duration || stroll.duration;
//     stroll.distance = distance || stroll.distance;
//     stroll.budget = budget || stroll.budget;
//     stroll.guide = guide || stroll.guide;

//     console.log("Updated stroll data:", stroll);

//     // Save the updated stroll to the database
//     const updatedStroll = await stroll.save();

//     console.log("Stroll with ID", id, "updated successfully");

//     res.json(updatedStroll);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  console.log("probando si sirve esto o no....",updatedData)

  try {
    const updatedStroll = await Stroll.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedStroll) {
      return res.status(404).json({ message: "Stroll not found" });
    }

    res.json(updatedStroll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});



//Test to add both propertys at the same time
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
router.get("/:id", (req, res)=> {
    Stroll.findById(req.params.id).populate("user")
        .then(strolls => res.json(strolls))
        .catch(err => console.error(err))
})

// router.get("/:id",(req,res) => {

//   try{
//    const stroll =  Stroll.findById(req.params.id).populate("user");
//     if (!stroll) {
//       return res.status(404).json({message: "Stroll not found"})
//     }

//     res.json(stroll)
//   } catch(error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
  
// })


// Stroll removed
router.delete("/:id", async (req, res, next) => {
    try {
      const deletedDoc = await Stroll.findByIdAndDelete(req.params.id);
      if (!deletedDoc) {
        return res.status(404).send("Document not found");
      }
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



