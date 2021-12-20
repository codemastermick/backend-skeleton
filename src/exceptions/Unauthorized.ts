import HttpException from "./Http";

export default class UnauthorizedException extends HttpException {
    constructor() {
        super(401, `You are not authorized to access this resource. Please try logging in first.`);
    }
}