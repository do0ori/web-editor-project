import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import NotesService from "../services/notes.service";

const getNotes = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user!.id;

    const notes = await NotesService.getNotes(userId);

    res.status(StatusCodes.OK).json(notes);
};

const getNote = async (req: Request, res: Response, next: NextFunction) => {
    const noteId = parseInt(req.params.id);

    const note = await NotesService.getNote(noteId);

    res.status(StatusCodes.OK).json(note);
};

const createNote = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user!.id;
    const { title, content } = req.body;

    await NotesService.createNote(title, content, userId);

    res.sendStatus(StatusCodes.CREATED);
};

const updateNote = async (req: Request, res: Response, next: NextFunction) => {
    const noteId = parseInt(req.params.id);
    const { title, content } = req.body;

    await NotesService.updateNote(noteId, title, content);

    res.sendStatus(StatusCodes.OK);
};

const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
    const noteId = parseInt(req.params.id);

    await NotesService.deleteNote(noteId);

    res.sendStatus(StatusCodes.OK);
};

const NotesController = {
    getNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote
};

export default NotesController;