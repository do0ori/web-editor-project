import express from "express";
import UsersController from "../controllers/users.controller";
import { authenticateUser } from "../middlewares/authentication.middleware";
import validate from "../middlewares/validation.middleware";

const router = express.Router();

router.post("/login", validate.user, UsersController.logIn);
router.post("/logout", UsersController.logOut);
router.get("/users/me", authenticateUser, UsersController.userInfo);
router.post("/users", validate.user, UsersController.signUp);

export default router;