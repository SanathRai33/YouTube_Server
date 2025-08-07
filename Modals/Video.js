import mongoose from "mongoose";

const videoSchema = mongoose.Schema(
  {
    videotitle: {
      type: String,
      required: true,
    },
    videodesc: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    filepath: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
    },
    filesize: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    videochannel: {
      type: String,
      required: true,
    },
    videotags: {
      type: [String],
      default: [],
    },
    visibility: {
      type: String,
      enum: ["public", "private", "unlisted"],
      default: "public",
    },
    likes: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("video", videoSchema);
