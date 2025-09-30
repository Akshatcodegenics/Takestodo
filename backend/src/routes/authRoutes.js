import { Router } from "express";
import { body } from "express-validator";
import { authController } from "../controllers/authController.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.post(
  "/signup",
  [
    body("name").isString().isLength({ min: 2 }).withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 chars"),
  ],
  validate,
  authController.signup
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isString().withMessage("Password is required"),
  ],
  validate,
  authController.login
);

router.post("/logout", authController.logout);
router.post("/refresh", authController.refresh);

export default router;
