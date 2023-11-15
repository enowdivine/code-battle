import mongoose from "mongoose";

const warning = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    message: {
      type: String,
      required: [true, "message is required"],
    },
    category: {
      type: String,
      required: [true, "category is required"],
    },
    location: {
      type: String,
    },
    status: {
      type: String,
      required: [true, "status is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Warning", warning);
