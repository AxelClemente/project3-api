const express = require("express");
const router = express.Router();
const fileUploader = require("../config/cloudinary.config");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// POST "/api/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  console.log("file is: ", req.file);

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  res.json({ fileUrl: req.file.path });
});

// CHANGING THE STROLL IMAGES

// imageStroll1
router.post(
  "/upload",
  fileUploader.single("imageStroll1"),
  (req, res, next) => {
    // console.log("file is: ", req.file)

    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    // Get the URL of the uploaded file and send it as a response.
    // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
    res.json({ fileUrl: req.file.path });
  }
);

// imageStroll2
router.post(
  "/upload",
  fileUploader.single("imageStroll2"),
  (req, res, next) => {
    // console.log("file is: ", req.file)

    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    // Get the URL of the uploaded file and send it as a response.
    // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
    res.json({ fileUrl: req.file.path });
  }
);

// imageStroll3
router.post(
  "/upload",
  fileUploader.single("imageStroll3"),
  (req, res, next) => {
    // console.log("file is: ", req.file)

    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    // Get the URL of the uploaded file and send it as a response.
    // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
    res.json({ fileUrl: req.file.path });
  }
);

// imageStroll4
router.post(
  "/upload",
  fileUploader.single("imageStroll4"),
  (req, res, next) => {
    // console.log("file is: ", req.file)

    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    // Get the URL of the uploaded file and send it as a response.
    // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
    res.json({ fileUrl: req.file.path });
  }
);

// imageStroll5
router.post(
  "/upload",
  fileUploader.single("imageStroll5"),
  (req, res, next) => {
    // console.log("file is: ", req.file)

    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    // Get the URL of the uploaded file and send it as a response.
    // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
    res.json({ fileUrl: req.file.path });
  }
);

// imageStroll6
router.post(
  "/upload",
  fileUploader.single("imageStroll6"),
  (req, res, next) => {
    // console.log("file is: ", req.file)

    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    // Get the URL of the uploaded file and send it as a response.
    // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
    res.json({ fileUrl: req.file.path });
  }
);

module.exports = router;
