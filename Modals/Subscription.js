import mongoose from "mongoose";

const subscriptionSchema = mongoose.Schema(
  {
    subscriber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("subscription", subscriptionSchema);
