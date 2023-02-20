const express = require("express");
const router = express.Router();

const User = require("../models/User.model");
const Rating = require("../models/Rating.model");
const Stroll = require("../models/Stroll.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");


router.post("/:strollId", (req, res, next) => {
    const { strollId } = req.params;
    console.log('this is the strollId ifo', strollId)
    const newRating = req.body;

    Rating.create(newRating)
    .then(newRating =>{
        console.log(res.data);
        res.json(newRating);
    })
    .catch(err => console.log(err))
})


router.delete("/:strollId/:ratingId", (req, res, next) => {
    Rating.findByIdAndDelete(req.params.ratingId, (err, deletedRating) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error deleting rating" });
      }
      if (!deletedRating) {
        return res.status(404).json({ message: "Rating not found" });
      }
      res.json(deletedRating);
    });
});


router.get('/strolls/:strollId/rating', (req, res, next) => {
    const { strollId } = req.params;
    Rating.find({ stroll: strollId })
      .then((ratings) => {
        if (ratings.length === 0) {
          return res.json({ averageRating: 0 });
        }
  
        const sum = ratings.reduce((acc, rating) => acc + rating.rating, 0);
        const averageRating = (sum / ratings.length).toFixed(2);
  
        return res.json({ averageRating });
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).json({ message: "Error retrieving average rating" });
      });
  });

module.exports = router;
