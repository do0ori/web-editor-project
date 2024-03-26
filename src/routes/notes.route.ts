import express from "express";
import notesController from "../controllers/notes.controller";
import { authenticateUser } from "../middlewares/authentication.middleware";
import { authorizeNote } from "../middlewares/authorization.middleware";
import validate from "../middlewares/validation.middleware";

const router = express.Router();

router.get("/", authenticateUser, notesController.getNotes);
router.post("/", authenticateUser, validate.note, notesController.createNote);
router.get("/:id", authenticateUser, validate.noteId, authorizeNote, notesController.getNote);
router.put("/:id", authenticateUser, validate.noteIdAndNote, authorizeNote, notesController.updateNote);
router.delete("/:id", authenticateUser, validate.noteId, authorizeNote, notesController.deleteNote);

export default router;