import jwt from "jsonwebtoken";

export function authRequired(req, res, next) {
  try {
    const header = req.headers["authorization"] || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: { message: "Unauthorized" } });
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = { id: decoded.sub };
    next();
  } catch (err) {
    return res.status(401).json({ error: { message: "Unauthorized" } });
  }
}
