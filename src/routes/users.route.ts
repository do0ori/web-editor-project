import express from "express";
import usersController from "../controllers/users.controller";
import { authenticateUser } from "../middlewares/authentication.middleware";

const router = express.Router();

router.post("/login", usersController.logIn);
router.post("/logout", usersController.logOut);
router.get("/users/me", authenticateUser, usersController.userInfo);
router.post("/users", usersController.signUp);

export default router;