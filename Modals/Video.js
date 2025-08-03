import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
  videotitle: {
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
  filesize: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  videochannel: {
    type: String,
    required: true,
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
    type: String,
  },
},{
    timestamps: true,
});

export default mongoose.model("video", videoSchema);