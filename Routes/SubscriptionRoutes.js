import express from "express";
import {
  subscribe,
  unsubscribe,
  getUserSubscriptions,
  getUserSubscribers,
} from "../Controllers/SubscriptionController.js";

const router = express.Router();

router.post("/subscribe", subscribe);
router.get("/:subscriberId/:channelId", checkSubscription); 
router.post("/unsubscribe", unsubscribe);
router.get("/subscriptions/:userId", getUserSubscriptions);
router.get("/subscribers/:userId", getUserSubscribers);

export default router;
