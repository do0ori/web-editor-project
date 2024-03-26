import { NextFunction, Request, Response } from "express";
import Note from "../models/note.model"
import { StatusCodes } from "http-status-codes";

const getNotes = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user!.id;

    const notes = await Note.getAll(userId) || [];

    res.status(StatusCodes.OK).json(notes);
};

const getNote = async (req: Request, res: Response, next: NextFunction) => {
    const noteId = parseInt(req.params.id);

    const note = await Note.get(noteId);

    res.status(StatusCodes.OK).json(note);
};

const createNote = async (req: Request, res: Response, next: NextFunction) => {
    const { title, content } = req.body;
    const userId = req.user!.id;

    await Note.create(title, content, userId);

    res.sendStatus(StatusCodes.CREATED);
};

const updateNote = async (req: Request, res: Response, next: NextFunction) => {
    const noteId = parseInt(req.params.id);
    const { title, content } = req.body;

    await Note.update(noteId, title, content);

    res.sendStatus(StatusCodes.OK);
};

const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
    const noteId = parseInt(req.params.id);

    await Note.remove(noteId);

    res.sendStatus(StatusCodes.OK);
};

const notesController = {
    getNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote
};

export default notesController;