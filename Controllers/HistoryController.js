import History from "../Modals/History.js";
import Video from "../Modals/Video.js";

export const handleHistory = async (req, res) => {
  const { userId } = req.body;
  const { videoId } = req.params;

  try {
    // Update existing or create new history record
    await History.findOneAndUpdate(
      { viewer: userId, videoid: videoId },
      { $set: { likedon: new Date() } },
      { upsert: true, new: true }
    );

    return res.status(200).json({ message: "History updated" });
  } catch (error) {
    console.error("Error updating history:", error);
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
