import express, { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.NO_CONTENT);
});

export default router;