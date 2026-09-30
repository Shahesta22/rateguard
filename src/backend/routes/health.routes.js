import { Router } from "express";
import redisClient from "../redis/client.js";

const router = Router();

router.get("/", async (req, res) => {
  let redis = "disconnected";

  try {
    if (redisClient.isReady) {
      redis = "connected";
    }
  } catch {}

  res.json({
    success: true,
    service: "RateGuard",
    status: "running",
    redis
  });
});

export default router;