import History from "../Modals/History.js";
import Video from "../Modals/Video.js";

import mongoose from "mongoose";
import History from "../Modals/History.js";
import Video from "../Modals/Video.js";

export const handleHistory = async (req, res) => {
  const { userId } = req.body;
  const { videoId } = req.params;

  // 🛑 Basic validations
  if (!userId || !videoId) {
    return res.status(400).json({ message: "Missing userId or videoId" });
  }

  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(videoId)
  ) {
    return res.status(400).json({ message: "Invalid userId or videoId" });
  }

  try {
    // Check if the history record already exists
    const existingHistory = await History.findOne({
      viewer: userId,
      videoid: videoId,
    });

    // Increment video views (even if already in history)
    await Video.findByIdAndUpdate(videoId, { $inc: { views: 1 } });

    if (existingHistory) {
      return res.status(200).json({ message: "Already in history" });
    }

    // Create new history record
    const newHistory = await History.create({
      viewer: userId,
      videoid: videoId,
    });

    return res.status(201).json({ history: newHistory });
  } catch (error) {
    console.error("❌ Error in handleHistory:", error);
    return res.status(500).json({ message: "Server error" });
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
