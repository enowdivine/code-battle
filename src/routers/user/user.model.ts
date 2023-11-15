import mongoose from "mongoose";

const user = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: [true, "phone number is required"],
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
