import { NextFunction, Request, Response } from "express";
import Note, { INote } from "../models/note.model";
import { NoteNotFoundError, NoteForbiddenError } from "../errors/userFacing.error";

declare module "express-serve-static-core" {
    interface Request {
        note?: INote;
    }
}

export const authorizeNote = async (req: Request, res: Response, next: NextFunction) => {
    const noteId = parseInt(req.params.id);
    const userId = req.user!.id;

    const note = await Note.get(noteId);

    if (!note) {
        throw new NoteNotFoundError();
    }

    if (note.user_id !== userId) {
        throw new NoteForbiddenError();
    }

    req.note = note;
    next();
};