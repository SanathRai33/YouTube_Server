import express from "express";
import {
  subscribe,
  unsubscribe,
  getUserSubscriptions,
  getUserSubscribers,
  checkSubscription,
} from "../Controllers/SubscriptionController.js";

const router = express.Router();

router.post("/subscribe", subscribe);
router.post("/unsubscribe", unsubscribe);

// 🔥 Static routes first
router.get("/subscriptions/:userId", getUserSubscriptions);
router.get("/subscribers/:userId", getUserSubscribers);

// ✅ Dynamic catch-all last
router.get("/:subscriberId/:channelId", checkSubscription);


export default router;
