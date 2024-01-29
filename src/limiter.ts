import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1h
  max: 1000,
  statusCode: 429,
  message: { error: "Too many requests from this IP, please try again later." },
});

export default limiter;
