import History from "../Modals/History.js";
import Video from "../Modals/Video.js";
import mongoose from "mongoose";

export const handleHistory = async (req, res) => {
  const { userId } = req.body;
  const { videoId } = req.params;

  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(videoId)
  ) {
    return res.status(400).json({ message: "Invalid user or video ID" });
  }

  try {
    // Upsert history: update if exists, else create
    await History.findOneAndUpdate(
      { viewer: userId, videoid: videoId },
      { $set: { likedon: Date.now() } },
      { upsert: true, new: true }
    );
    await Video.findByIdAndUpdate(videoId, { $inc: { views: 1 } });
    return res.status(200).json({ history: true });
  } catch (error) {
    console.error("History DB error:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const handleView = async (req, res) => {
  const { videoId } = req.params;
  try {
    await Video.findByIdAndUpdate(videoId, { $inc: { views: 1 } });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllHistorydVideo = async (req, res) => {
  const { userId } = req.params;
  try {
    const historyVideo = await History.find({ viewer: userId })
      .sort({ createdAt: -1 }) // newest first
      .populate({ path: "videoid", model: "video" })
      .exec();
    return res.status(200).json(historyVideo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
