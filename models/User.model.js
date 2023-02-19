const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    country: {
      type: String,
      lowercase: true,
      trim: true,
    },
    city: {
      type: String,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      required: [true, "Username is required."],
    },
    profilePicture: {
      type: String,
    },
    stroll: [{ type: Schema.Types.ObjectId, ref: 'Stroll' }],
    list: [{ type: Schema.Types.ObjectId, ref: 'Stroll' }],
    rating: [{ type: Schema.Types.ObjectId, ref: 'Rating' }],
    
  },
  
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
