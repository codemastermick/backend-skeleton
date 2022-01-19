import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from '../exceptions/HttpException';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (error: HttpException, _request: Request, response: Response, _next: NextFunction) => {
    const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || 'Something went wrong';
    response
        .status(status)
        .send({
            status,
            message,
        })
}

export default errorHandler;