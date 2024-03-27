interface ApplicationErrorProps {
    statusCode: number;
}

export class ApplicationError extends Error implements ApplicationErrorProps {
    constructor(message: string, public statusCode: number) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class DatabaseError extends ApplicationError { }

export class UserFacingError extends ApplicationError { }