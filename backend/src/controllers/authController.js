import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { generateAccessToken, generateRefreshToken } from "../utils/tokens.js";

function setRefreshTokenCookie(res, token) {
  const cookieName = process.env.REFRESH_TOKEN_COOKIE_NAME || "refresh_token";
  const isProd = process.env.NODE_ENV === "production";
  const maxAgeDays = Number(process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS || 7);
  res.cookie(cookieName, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: maxAgeDays * 24 * 60 * 60 * 1000,
    path: "/",
  });
}

function clearRefreshTokenCookie(res) {
  const cookieName = process.env.REFRESH_TOKEN_COOKIE_NAME || "refresh_token";
  const isProd = process.env.NODE_ENV === "production";
  res.clearCookie(cookieName, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
  });
}

export const authController = {
  signup: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const existing = await User.findOne({ email });
      if (existing) return res.status(409).json({ error: { message: "Email already in use" } });
      const user = await User.create({ name, email, password });
      const accessToken = generateAccessToken(user._id.toString());
      const refreshToken = generateRefreshToken(user._id.toString(), user.tokenVersion);
      setRefreshTokenCookie(res, refreshToken);
      res.status(201).json({
        user: { id: user._id, name: user.name, email: user.email },
        accessToken,
      });
    } catch (err) { next(err); }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ error: { message: "Invalid credentials" } });
      const match = await user.comparePassword(password);
      if (!match) return res.status(401).json({ error: { message: "Invalid credentials" } });
      const accessToken = generateAccessToken(user._id.toString());
      const refreshToken = generateRefreshToken(user._id.toString(), user.tokenVersion);
      setRefreshTokenCookie(res, refreshToken);
      res.json({ user: { id: user._id, name: user.name, email: user.email }, accessToken });
    } catch (err) { next(err); }
  },

  logout: async (req, res, next) => {
    try {
      clearRefreshTokenCookie(res);
      res.json({ message: "Logged out" });
    } catch (err) { next(err); }
  },

  refresh: async (req, res, next) => {
    try {
      const cookieName = process.env.REFRESH_TOKEN_COOKIE_NAME || "refresh_token";
      const token = req.cookies[cookieName];
      if (!token) return res.status(401).json({ error: { message: "Missing refresh token" } });
      const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      const user = await User.findById(payload.sub);
      if (!user) return res.status(401).json({ error: { message: "Invalid refresh token" } });
      if (user.tokenVersion !== payload.tv) {
        return res.status(401).json({ error: { message: "Invalid refresh token" } });
      }
      const accessToken = generateAccessToken(user._id.toString());
      const newRefresh = generateRefreshToken(user._id.toString(), user.tokenVersion);
      setRefreshTokenCookie(res, newRefresh);
      res.json({ accessToken });
    } catch (err) { next(err); }
  },
};
