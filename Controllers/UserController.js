import mongoose from "mongoose";
import users from "../Modals/User.js";

export const login = async (req, res) => {
  const { email, name, image } = req.body;
  try {
    const existingUser = await users.findOne({ email });
    if (!existingUser) {
      try {
        const newUser = await users.create({ email, name, image });
        res.status(201).json({ result: newUser });
      } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        return;
      }
    } else {
      res.status(200).json({ result: existingUser });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateProfile = async (req, res) => {
  const { id: _id } = req.params;
  const { channelname, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(500).json({ message: "User unavailable" });
  }
  try {
    const updatedata = await users.findByIdAndUpdate(
      _id,
      {
        $set: {
          channelname: channelname,
          description: description,
        },
      },
      { new: true }
    );
    res.status(201).json({ updatedata });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateBanner = async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  if (!req.file || !req.file.path) {
    return res.status(400).json({ message: "No banner file uploaded" });
  }
  try {
    const updatedUser = await users.findByIdAndUpdate(
      userId,
      { $set: { banner: req.file.path } },
      { new: true }
    );
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};