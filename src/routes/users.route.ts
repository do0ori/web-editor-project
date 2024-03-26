import express from "express";
import usersController from "../controllers/users.controller";
import { authenticateUser } from "../middlewares/authentication.middleware";
import validate from "../middlewares/validation.middleware";

const router = express.Router();

router.post("/login", validate.user, usersController.logIn);
router.post("/logout", usersController.logOut);
router.get("/users/me", authenticateUser, usersController.userInfo);
router.post("/users", validate.user, usersController.signUp);

export default router;