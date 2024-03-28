import express from "express";
import NotesController from "../controllers/notes.controller";
import { authenticateUser } from "../middlewares/authentication.middleware";
import { authorizeNote } from "../middlewares/authorization.middleware";
import validate from "../middlewares/validation.middleware";

const router = express.Router();

router.get("/", authenticateUser, NotesController.getNotes);
router.post("/", authenticateUser, validate.note, NotesController.createNote);
router.get("/:id", authenticateUser, validate.noteId, authorizeNote, NotesController.getNote);
router.put("/:id", authenticateUser, validate.noteIdAndNote, authorizeNote, NotesController.updateNote);
router.delete("/:id", authenticateUser, validate.noteId, authorizeNote, NotesController.deleteNote);

export default router;