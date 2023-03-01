const { Schema, model } = require("mongoose");

const strollSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      lowercase: true,
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country is required."],
      lowercase: true,
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required."],
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    duration: {
      type: String,
      required: [true, "Duration is required."],
    },
    stops1: {
      type: String,
      required: [true, "Stops are required."],
    },
    stops2: {
      type: String,
      required: [true, "Stops are required."],
    },
    stops3: {
      type: String,
      required: [true, "Stops are required."],
    },
    stops4: {
      type: String,
      required: [true, "Stops are required."],
    },
    stops5: {
      type: String,
      required: [true, "Stops are required."],
    },
    stops6: {
      type: String,
      // required: [true, "Stops are required."],
    },
    imageStroll1: {
      type: String,
    },
    imageStroll2: {
      type: String,
    },
    imageStroll3: {
      type: String,
    },
    imageStroll4: {
      type: String,
    },
    imageStroll5: {
      type: String,
    },
    imageStroll6: {
      type: String,
    },
    budget: {
      type: Number,
      required: [true, "Budget is required."],
    },
    distance: {
      type: String,
      required: [true, "Distance is required."],
    },
    guide: {
      type: String,
      required: [true, "Guide property is required"],
      validate: {
        validator: function (value) {
          return value === "Available" || value === "No";
        },
        message: "Guide property must be either 'yes' or 'no'",
      },
    },
    rating: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
    user: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Stroll = model("Stroll", strollSchema);

module.exports = Stroll;
