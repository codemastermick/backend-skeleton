import CommonRoutesConfig from '@lib/common.routes.config';
import authenticateJWT from '@middleware/authentication.middleware';
import UnauthorizedException from '../exceptions/UnauthorizedException';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';

const sendPongResponse = (res: express.Response) => {
    res.contentType("application/json");
    res.status(StatusCodes.OK);
    res.send({ 'message': 'pong' });
}

export default class PingRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'PingRoutes');
    }
    configureRoutes(): express.Application {
        this.app.route("/ping").all((_req: express.Request, res: express.Response, next: express.NextFunction) => {
            // add logic here to run before running http verbs, like authentication
            next();
        }).get((_req: express.Request, res: express.Response) => {
            sendPongResponse(res);
        });

        this.app.route("/auth-ping").all((req: express.Request, res: express.Response, next: express.NextFunction) => {
            // add logic here to run before running http verbs, like authentication
            authenticateJWT(req, res, next);
            if (!req.user) {
                throw new UnauthorizedException();
            }
            next();
        }).get((req: express.Request, res: express.Response) => {
            sendPongResponse(res);
        });

        this.app.route("/admin-ping").all((req: express.Request, res: express.Response, next: express.NextFunction) => {
            // add logic here to run before running http verbs, like authentication
            authenticateJWT(req, res, next);
            next();
        }).get((req: express.Request, res: express.Response) => {
            const { role } = req.user as JwtPayload;
            if (role !== 'admin') {
                return res.sendStatus(StatusCodes.FORBIDDEN);
            }
            sendPongResponse(res);
        });

        return this.app;
    }
}