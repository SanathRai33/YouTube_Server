import Video from "../Modals/Video.js";
import User from "../Modals/User.js";

export const uploadVideo = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Upload only mp4 video file" });
  }

  try {
    const {
      videotitle,
      videodesc,
      videotags,
      videochannel,
      uploader,
    } = req.body;

    const file = new Video({
      videotitle,
      videodesc,
      videotags: videotags ? videotags.split(",").map((tag) => tag.trim()) : [],
      filename: req.file.originalname,
      filepath: req.file.path,
      public_id: req.file.public_id,
      filetype: req.file.mimetype,
      filesize: req.file.size,
      videochannel,
      uploader,
    });

    const savedVideo = await file.save();

    const populatedVideo = await Video.findById(savedVideo._id).populate("uploader");

    return res.status(201).json({
      message: "File uploaded successfully",
      video: populatedVideo,
    });
  } catch (error) {
    console.error("Upload error", error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};


export const getAllVideos = async (req, res) => {
  try {
    const files = await Video.find().populate({
      path: "uploader",
      model: "user",
      select: "image",
    });

    return res.status(200).send(files);
  } catch (error) {
    console.log("Error in getAllVideos:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getMyChannelVideos = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const videos = await Video.find({ uploader: userId })
      .populate("uploader", "channelname image")
      .sort({ createdAt: -1 }); 

    res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetching user videos:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
