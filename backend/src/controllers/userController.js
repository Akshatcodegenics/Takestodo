import { User } from "../models/User.js";

export const userController = {
  me: async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select("_id name email createdAt updatedAt");
      res.json({ user });
    } catch (err) { next(err); }
  },
  updateMe: async (req, res, next) => {
    try {
      const { name } = req.body;
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: { name } },
        { new: true, runValidators: true }
      ).select("_id name email createdAt updatedAt");
      res.json({ user });
    } catch (err) { next(err); }
  },
};
