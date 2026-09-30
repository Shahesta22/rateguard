import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "RateGuard API is working"
  });
});

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Protected API test endpoint"
  });
});

export default router;