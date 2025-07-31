import Like from "../Modals/Like.js";
import Video from "../Modals/Video.js";

export const handleLike = async (req, res) => {
  const { userId } = req.body;
  const { videoId } = req.params;

  try {
    const existingLike = await Like.findOne({
      viewer: userId,
      videoid: videoId,
    });

    if (existingLike) {
      await Like.findByIdAndDelete(existingLike._id);
      await Video.findByIdAndUpdate(videoId, { $inc: { like: -1 } });
      return res.status(200).json({ liked: false });
    } else {
      await Like.create({ viewer: userId, videoid: videoId });
      await Video.findByIdAndUpdate(videoId, { $inc: { like: +1 } });
      return res.status(200).json({ liked: true });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllLikedVideo = async (req, res) => {
  const { userId } = req.body;
  try {
    const likedVideo = await Like.find({ viewer: userId })
      .populate({
        path: "videoid",
        model: "video",
      })
      .exec();
    return res.status(200).json(likedVideo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// export const handleDisLike = async (req, res) => {
//   const { userId } = req.body;
//   const { videoId } = req.params;

//   try {
//     const existingLike = await Like.fineOne({
//       viewer: userId,
//       videoid: videoId,
//     });

//     if (existingLike) {
//       await Like.findByIdAndDelete(existingLike._id);
//       await Video.findByIdAndUpdate(videoId, { $inc: { Like: -1 } });
//       return res.json({ liked: false });
//     } else {
//       await Like.create({ viewer: userId, videoid: videoId });
//       await Video.findByIdAndUpdate(videoId, { $inc: { Like: +1 } });
//       return res.json({ liked: true });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong" });
//     return;
//   }
// };
