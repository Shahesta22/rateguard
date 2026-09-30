import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: Number(process.env.PORT || 5000),

  redis: {
    host: process.env.REDIS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT || 6379),
  },

  rateLimit: {
    windowSeconds: Number(process.env.RATE_LIMIT_WINDOW || 60),
    maxRequests: Number(process.env.RATE_LIMIT_MAX || 100),
  },

  environment: process.env.NODE_ENV || "development",
};
