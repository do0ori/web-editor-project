import { NextFunction, Request, Response } from "express";
import Note from "../models/note.model";
import { NoteForbiddenError } from "../errors/userFacing.error";
import NotesService from "../services/notes.service";

declare module "express-serve-static-core" {
    interface Request {
        note?: Note;
    }
}

export const authorizeNote = async (req: Request, res: Response, next: NextFunction) => {
    const noteId = parseInt(req.params.id);
    const userId = req.user!.id;

    const note = await NotesService.getNote(noteId);

    if (note.user_id !== userId) throw new NoteForbiddenError();

    req.note = note;
    next();
};