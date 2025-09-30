import jwt from "jsonwebtoken";

export function generateAccessToken(userId) {
  const payload = { sub: userId };
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
}

export function generateRefreshToken(userId, tokenVersion) {
  const payload = { sub: userId, tv: tokenVersion };
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: `${process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS || 7}d` });
}
