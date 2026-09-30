const requests = new Map();

export function rateGuard(req, res, next) {
  const ip = req.ip || req.socket.remoteAddress;
  const endpoint = req.originalUrl;

  const key = `${ip}:${endpoint}`;

  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 5;

  if (!requests.has(key)) {
    requests.set(key, []);
  }

  const timestamps = requests.get(key);

  // Remove requests older than 60 seconds
  const recentRequests = timestamps.filter((time) => now - time < windowMs);

  if (recentRequests.length >= maxRequests) {
    const oldestRequest = recentRequests[0];
    const retryAfter = Math.ceil((windowMs - (now - oldestRequest)) / 1000);

    res.setHeader("Retry-After", retryAfter);
    res.setHeader("X-RateLimit-Limit", maxRequests);
    res.setHeader("X-RateLimit-Remaining", 0);
    res.setHeader(
      "X-RateLimit-Reset",
      Math.ceil((oldestRequest + windowMs) / 1000),
    );

    return res.status(429).json({
      success: false,
      message: "Too many requests. Please try again later.",
    });
  }

  recentRequests.push(now);
  requests.set(key, recentRequests);

  res.setHeader("X-RateLimit-Limit", maxRequests);
  res.setHeader("X-RateLimit-Remaining", maxRequests - recentRequests.length);

  next();
}
