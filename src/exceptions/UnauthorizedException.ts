import { StatusCodes } from "http-status-codes";
import HttpException from "./HttpException";

export default class UnauthorizedException extends HttpException {
    constructor() {
        super(StatusCodes.UNAUTHORIZED, `You are not authorized to access this resource. Please try logging in first.`);
    }
}