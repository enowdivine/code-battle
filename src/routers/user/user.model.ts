import mongoose from "mongoose";

const user = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
    longitude: {
      type: Number,
      required: [true, "longitude is required"],
    },
    latitude: {
      type: Number,
      required: [true, "latitude is required"],
    },
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", user);
