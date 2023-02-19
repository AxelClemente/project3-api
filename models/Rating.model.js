const { Schema, model } = require("mongoose");

const ratingSchema = new Schema(
  {
    rating: {
      type: Number,
    },
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    stroll: [{ type: Schema.Types.ObjectId, ref: 'Stroll' }],
  },
  {
    timestamps: true,
  }
);

const Rating = model("Rating", ratingSchema);

module.exports = Rating;