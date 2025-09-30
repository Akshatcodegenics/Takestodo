export function errorResponder(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  const details = err.details || undefined;
  if (process.env.NODE_ENV !== "test") {
    console.error(`[Error] ${status} - ${message}`, details || "");
  }
  res.status(status).json({ error: { message, details } });
}

export function notFound(req, res, next) {
  res.status(404).json({ error: { message: "Route not found" } });
}
