import Subscription from "../Modals/Subscription.js";

export const subscribe = async (req, res) => {
  const { subscriberId, channelId } = req.body;

  if (subscriberId === channelId)
    return res
      .status(400)
      .json({ message: "You cannot subscribe to yourself." });

  const existing = await Subscription.findOne({
    subscriber: subscriberId,
    channel: channelId,
  });
  if (existing)
    return res
      .status(400)
      .json({ message: "Already subscribed to this channel." });

  const newSub = new Subscription({
    subscriber: subscriberId,
    channel: channelId,
  });
  await newSub.save();

  res.status(201).json({ message: "Subscription successful." });
};

// Unsubscribe from a channel
export const unsubscribe = async (req, res) => {
  const { subscriberId, channelId } = req.body;

  const sub = await Subscription.findOneAndDelete({
    subscriber: subscriberId,
    channel: channelId,
  });
  if (!sub) return res.status(404).json({ message: "Subscription not found." });

  res.status(200).json({ message: "Unsubscribed successfully." });
};

// Get a user's subscriptions (channels they follow)
export const getUserSubscriptions = async (req, res) => {
  const { userId } = req.params;

  const subscriptions = await Subscription.find({
    subscriber: userId,
  }).populate("channel", "name channelname image");
  res.status(200).json(subscriptions);
};

// Get a user's subscribers (users who follow this user)
export const getUserSubscribers = async (req, res) => {
  const { userId } = req.params;

  const subscribers = await Subscription.find({ channel: userId }).populate(
    "subscriber",
    "name channelname image"
  );
  res.status(200).json(subscribers);
};
