import mongoose from "mongoose";

const likeSchema = mongoose.Schema(
  {
    viewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    videoid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "video",
      require: true,
    },
    likedon: {
      type: Date,
      default: Date.now,
    },
    filetype: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("like", likeSchema);
