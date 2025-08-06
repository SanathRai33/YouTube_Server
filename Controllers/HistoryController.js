import mongoose from "mongoose";
import History from "../Modals/History.js";
import Video from "../Modals/Video.js";

export const handleHistory = async (req, res) => {
  const { userId } = req.body;
  const { videoId } = req.params;

  try {
    // Always create a new history record
    await History.create({ viewer: userId, videoid: videoId });

    return res.status(201).json({ message: "History entry created" });
  } catch (error) {
    console.error("Error adding to history:", error);
    return res.status(500).json({ message: "Internal Server Error" });
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
