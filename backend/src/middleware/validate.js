import { validationResult } from "express-validator";

export function validate(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  const details = errors.array().map(e => ({ field: e.param, message: e.msg }));
  const err = new Error("Validation error");
  err.status = 400;
  err.details = details;
  next(err);
}
