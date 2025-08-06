import Video from "../Modals/Video.js";

export const uploadVideo = async (req, res) => {
  if (!req.file) {
    return res.status(404).json({ message: "Upload only mp4 video file" });
  } else {
    try {
      const file = new Video({
        videotitle: req.body.videotitle,
        filename: req.file.originalname,
        filepath: req.file.path,
        public_id: req.file.public_id,
        filetype: req.file.mimetype,
        filesize: req.file.size,
        videochannel: req.body.videochannel,
        uploader: req.body.uploader,
      });
      await file.save();
      return res.status(201).json("File uploaded successfully");
    } catch (error) {
      console.log("Upload error", error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const files = await Video.find().populate({
      path: "uploader",
      model: "user", // or "User" if your model is named with capital
      select: "image", // only fetch needed fields
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
    const videos = await Video.find({ uploader: userId });
    res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetching user videos:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};