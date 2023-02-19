const express = require("express");
const router = express.Router();

const User = require("../models/Rating.model");
const Rating = require("../models/Rating.model");
const Stroll = require("../models/Stroll.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// router.post("/", (req, res, next) => {
//     const newRating = req.body;
//     Rating.create(newRating)
//     .then(newRating =>{
//         console.log(res.data);
//         res.json(newRating);
//     })
//     .catch(err => console.log(err))
// })


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

module.exports = router;
