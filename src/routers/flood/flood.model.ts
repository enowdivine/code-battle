import mongoose from "mongoose";

const flood = new mongoose.Schema(
  {
    data: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Flood", flood);
