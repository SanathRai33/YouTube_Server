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

export const getAllVideos = async(req, res)=>{
  try {
    const files = await Video.find();
    return res.status(200).send(files)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Something went wrong"});
  }
}