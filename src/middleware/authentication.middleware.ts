/* eslint-disable no-shadow */
import Logger from '@lib/Logger';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';

declare module 'express-serve-static-core' {
    interface Request {
        user?: string | JwtPayload
    }
    interface Response {
        user?: string | JwtPayload
    }
}
const logger = new Logger("AUTH");

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SIGNING_SECRET, (err: Error, user: JwtPayload) => {
            if (err) {
                logger.error(err.message);
                return res.sendStatus(StatusCodes.FORBIDDEN);
            }

            req.user = user;
            next();
        });
    } else {
        return res.sendStatus(StatusCodes.UNAUTHORIZED);
    }
};

export default authenticateJWT;