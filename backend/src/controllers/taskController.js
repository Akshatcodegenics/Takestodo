import { Task } from "../models/Task.js";

export const taskController = {
  stats: async (req, res, next) => {
    try {
      const pipeline = [
        { $match: { user: req.user.id } },
        { $group: { _id: "$status", count: { $sum: 1 }, completed: { $sum: { $cond: ["$completed", 1, 0] } } } },
      ]
      const rows = await Task.aggregate(pipeline)
      const byStatus = { todo: 0, 'in-progress': 0, done: 0 }
      let total = 0
      let completed = 0
      for (const r of rows) {
        byStatus[r._id] = r.count
        total += r.count
        completed += r.completed
      }
      res.json({ byStatus, total, completed, remaining: total - completed })
    } catch (err) { next(err) }
  },

  list: async (req, res, next) => {
    try {
      const { q, status, completed, page = 1, limit = 10 } = req.query;
      const filter = { user: req.user.id };
      if (q) {
        filter.$or = [
          { title: { $regex: q, $options: "i" } },
          { description: { $regex: q, $options: "i" } },
        ];
      }
      if (status) filter.status = status;
      if (typeof completed !== "undefined") filter.completed = completed === "true";
      const skip = (Number(page) - 1) * Number(limit);
      const [items, total] = await Promise.all([
        Task.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
        Task.countDocuments(filter),
      ]);
      res.json({ items, total, page: Number(page), limit: Number(limit) });
    } catch (err) { next(err); }
  },
  get: async (req, res, next) => {
    try {
      const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
      if (!task) return res.status(404).json({ error: { message: "Task not found" } });
      res.json({ task });
    } catch (err) { next(err); }
  },
  create: async (req, res, next) => {
    try {
      const { title, description, status, completed } = req.body;
      const task = await Task.create({ user: req.user.id, title, description, status, completed });
      res.status(201).json({ task });
    } catch (err) { next(err); }
  },
  update: async (req, res, next) => {
    try {
      const { title, description, status, completed } = req.body;
      const task = await Task.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        { $set: { title, description, status, completed } },
        { new: true, runValidators: true }
      );
      if (!task) return res.status(404).json({ error: { message: "Task not found" } });
      res.json({ task });
    } catch (err) { next(err); }
  },
  remove: async (req, res, next) => {
    try {
      const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
      if (!task) return res.status(404).json({ error: { message: "Task not found" } });
      res.json({ message: "Task deleted" });
    } catch (err) { next(err); }
  },
};
