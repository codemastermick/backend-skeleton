import HttpException from "./HttpException";

export default class DatabaseException extends HttpException {
    status: number;
    message: string;
    constructor(status: number, message: string) {
        super(status, message);
    }
}