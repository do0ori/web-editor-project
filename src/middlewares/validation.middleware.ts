import { NextFunction, Request, Response } from "express";
import { body, param, validationResult, ValidationChain } from "express-validator";
import { StatusCodes } from "http-status-codes";

type Validator = (fields?: string | string[] | undefined) => ValidationChain;

const checkValidationResult = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.sendStatus(StatusCodes.BAD_REQUEST);
    }

    next();
}


const checkPosInt = (location: Validator, field: string) => location(field).exists().isInt({ gt: 0 });

const checkEmail = (location: Validator, field: string) => location(field).exists().isEmail().withMessage("Invalid email address");

const checkPassword = (location: Validator, field: string, min: number) => location(field).exists().isLength({ min }).withMessage(`Password must be at least ${min} characters long`);

const checkString = (location: Validator, field: string) => location(field).exists().isString();


const userValidation = [
    checkEmail(body, "email"),
    checkPassword(body, "password", 8)
];

const noteValidation = [
    checkString(body, "title"),
    checkString(body, "content")
];

const noteIdValidation = checkPosInt(param, "id");


const validate = {
    user: [...userValidation, checkValidationResult],
    note: [...noteValidation, checkValidationResult],
    noteId: [noteIdValidation, checkValidationResult],
    noteIdAndNote: [noteIdValidation, ...noteValidation, checkValidationResult],
};

export default validate;
