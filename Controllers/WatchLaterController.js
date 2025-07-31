import WatchLater from "../Modals/WatchLater.js";

export const handleWatchLater = async (req, res) => {
  const { userId } = req.body;
  const { videoId } = req.params;

  try {
    const existingWatchLater = await WatchLater.findOne({
      viewer: userId,
      videoid: videoId,
    });

    if (existingWatchLater) {
      await WatchLater.findByIdAndDelete(existingWatchLater._id);
      return res.status(200).json({ watchLater: false });
    } else {
      await WatchLater.create({ viewer: userId, videoid: videoId });
      return res.status(200).json({ watchLater: true });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllWatchLater = async (req, res) => {
  const { userId } = req.params;
  try {
    const watchLaterVideo = await WatchLater.find({ viewer: userId })
      .populate({
        path: "videoid",
        model: "video",
      })
      .exec();
    return res.status(200).json(watchLaterVideo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
