import { UserFacingError } from "./base.error";
import { StatusCodes } from "http-status-codes";

export class LogInFail extends UserFacingError {
    constructor() {
        super("로그인 정보가 올바르지 않습니다.", StatusCodes.UNAUTHORIZED);
    }
}

export class SignUpFail extends UserFacingError {
    constructor() {
        super("회원가입 정보가 올바르지 않습니다.", StatusCodes.BAD_REQUEST);
    }
}

export class AuthenticationError extends UserFacingError {
    constructor() {
        super("인증되지 않은 사용자입니다.", StatusCodes.UNAUTHORIZED);
    }
}

export class NoteNotFoundError extends UserFacingError {
    constructor() {
        super("노트를 찾을 수 없습니다.", StatusCodes.NOT_FOUND);
    }
}

export class NoteForbiddenError extends UserFacingError {
    constructor() {
        super("해당 노트에 대한 권한이 없습니다.", StatusCodes.FORBIDDEN);
    }
}

export class CreateNoteFail extends UserFacingError {
    constructor() {
        super("노트 정보가 올바르지 않습니다.", StatusCodes.FORBIDDEN);
    }
}

export class UpdateNoteFail extends CreateNoteFail { }

export class DeleteNoteFail extends CreateNoteFail { }

export class ValidationError extends UserFacingError {
    constructor() {
        super("요청 정보가 올바르지 않습니다.", StatusCodes.BAD_REQUEST);
    }
}