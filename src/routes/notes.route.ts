import express from "express";
import notesController from "../controllers/notes.controller";
import { authenticateUser } from "../middlewares/authentication.middleware";
import { authorizeNote } from "../middlewares/authorization.middleware";

const router = express.Router();

router.get("/", authenticateUser, notesController.getNotes);
router.post("/", authenticateUser, notesController.createNote);
router.get("/:id", authenticateUser, authorizeNote, notesController.getNote);
router.put("/:id", authenticateUser, authorizeNote, notesController.updateNote);
router.delete("/:id", authenticateUser, authorizeNote, notesController.deleteNote);

export default router;