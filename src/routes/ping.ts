import CommonRoutesConfig from '@lib/common.routes.config';
import express from 'express';

export default class PingRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'PingRoutes');
    }
    configureRoutes(): express.Application {
        this.app.route("/ping").all((_req: express.Request, res: express.Response, next: express.NextFunction) => {
            // add logic here to run before running http verbs, like authentication
            next();
        }).get((_req: express.Request, res: express.Response) => {
            res.contentType("application/json");
            res.send({ 'message': 'pong' });
        });
        return this.app;
    }
}