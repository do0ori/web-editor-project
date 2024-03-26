import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Note, { INote } from "../models/note.model";

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
        return res.sendStatus(StatusCodes.NOT_FOUND);
    }

    if (note.user_id !== userId) {
        return res.sendStatus(StatusCodes.FORBIDDEN);
    }

    req.note = note;
    next();
};