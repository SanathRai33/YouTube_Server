import History from "../Modals/History.js";
import Video from "../Modals/Video.js";
import mongoose from "mongoose";

export const handleHistory = async (req, res) => {
  const { userId } = req.body;
  const { videoId } = req.params;

  // Validate inputs
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    return res.status(400).json({ message: "Invalid video ID" });
  }

  try {
    const result = await History.findOneAndUpdate(
      { viewer: userId, videoid: videoId },
      { $set: { likedon: new Date() } },
      { upsert: true, new: true, runValidators: true }
    );

    console.log("History update result:", result);
    return res.status(200).json({ message: "History updated", data: result });
  } catch (error) {
    console.error("Detailed history error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
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
