import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApplicationError } from "../errors/base.error";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === "development") {
        console.error(`>> ${new Date().toLocaleString()}: ${err}`);
    }

    // 데이터베이스에서 발생한 중복 입력 에러 처리
    if ("code" in err && err.code === "ER_DUP_ENTRY") {
        res.status(StatusCodes.CONFLICT).json({ message: "중복된 데이터가 이미 존재합니다." });
    }
    // JWT 관련 에러 처리
    else if (err.name === "TokenExpiredError") {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "토큰이 만료되었습니다." });
    } else if (err.name === "JsonWebTokenError") {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "잘못된 토큰입니다." });
    } else if (err.name === "NotBeforeError") {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "토큰이 아직 활성화되지 않았습니다." });
    }
    // ApplicationError를 상속한 에러 처리
    else if (err instanceof ApplicationError) {
        res.status(err.statusCode).json({ message: err.message });
    }
    // 그 외의 모든 에러는 서버 내부 오류로 처리
    else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "서버 내부 오류가 발생했습니다." });
    }
};

export default errorHandler;