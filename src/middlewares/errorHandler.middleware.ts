import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === "development") {
        console.error(`>> ${new Date().toLocaleString()}: ${err}`);
    }

    if ("code" in err && err.code === "ER_DUP_ENTRY") {
        res.status(StatusCodes.CONFLICT).json({ message: err.message });
    } else if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError" || err.name === "NotBeforeError") {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message });
    } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
};

export default errorHandler;