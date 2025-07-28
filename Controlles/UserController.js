import users from "../Modals/User.js";

export const login = async (req, res) => {
  const { email, name, image } = req.body;
  try {
    const existingUser = await users.findOne({ email });
    if (!existingUser) {
      try {
        const newUser = await users.create({ email, name, image });
        res.status(200).json({ result: newUser });
      } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        return;
      }
    } else {
      res.status(200).json({ result: existingUser });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    return;
  }
};
