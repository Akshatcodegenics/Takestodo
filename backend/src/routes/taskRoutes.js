import { Router } from "express";
import { body, param, query } from "express-validator";
import { taskController } from "../controllers/taskController.js";
import { authRequired } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.get(
  "/stats",
  authRequired,
  [],
  validate,
  taskController.stats
);

router.get(
  "/",
  authRequired,
  [
    query("q").optional().isString(),
    query("status").optional().isIn(["todo", "in-progress", "done"]).withMessage("Invalid status"),
    query("completed").optional().isBoolean().withMessage("completed must be boolean"),
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 100 }),
  ],
  validate,
  taskController.list
);

router.get(
  "/:id",
  authRequired,
  [param("id").isMongoId()],
  validate,
  taskController.get
);

router.post(
  "/",
  authRequired,
  [
    body("title").isLength({ min: 1 }).withMessage("Title is required"),
    body("description").optional().isString(),
    body("status").optional().isIn(["todo", "in-progress", "done"]).withMessage("Invalid status"),
    body("completed").optional().isBoolean(),
  ],
  validate,
  taskController.create
);

router.put(
  "/:id",
  authRequired,
  [
    param("id").isMongoId(),
    body("title").optional().isLength({ min: 1 }),
    body("description").optional().isString(),
    body("status").optional().isIn(["todo", "in-progress", "done"]),
    body("completed").optional().isBoolean(),
  ],
  validate,
  taskController.update
);

router.delete(
  "/:id",
  authRequired,
  [param("id").isMongoId()],
  validate,
  taskController.remove
);

export default router;
