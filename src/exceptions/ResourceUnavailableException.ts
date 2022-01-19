import { StatusCodes } from "http-status-codes";
import HttpException from "./HttpException";

export default class ResourceUnavailableException extends HttpException {
    constructor(uri: string) {
        super(StatusCodes.NOT_FOUND, `Could not access the resource at ${uri}.`);
    }
}