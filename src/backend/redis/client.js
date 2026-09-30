import { createClient } from "redis";
import { config } from "../config/env.js";

const redisClient = createClient({
  socket: {
    host: config.redis.host,
    port: config.redis.port
  }
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err.message);
});

export async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }

  console.log("Redis connected");
}

export default redisClient;