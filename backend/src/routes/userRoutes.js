import { Router } from "express";
import { body } from "express-validator";
import { userController } from "../controllers/userController.js";
import { authRequired } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.get("/me", authRequired, userController.me);
router.put(
  "/me",
  authRequired,
  [body("name").optional().isLength({ min: 2 }).withMessage("Name must be at least 2 chars")],
  validate,
  userController.updateMe
);

export default router;
