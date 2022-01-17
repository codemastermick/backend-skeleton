import CommonRoutesConfig from '@lib/common.routes.config';
import express from 'express';

export default class CrudRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'CrudRoutes');
    }
    configureRoutes(): express.Application {
        this.app.route("/crud").all((_req: express.Request, res: express.Response, next: express.NextFunction) => {
            // add logic here to run before running http verbs, like authentication
            next();
        }).post((_req: express.Request, res: express.Response) => {
            res.contentType("application/json");
            res.send({ 'message': 'Create success!' });
        }).get((_req: express.Request, res: express.Response) => {
            res.contentType("application/json");
            res.send({ 'message': 'Read success!' });
        }).put((_req: express.Request, res: express.Response) => {
            res.contentType("application/json");
            res.send({ 'message': 'Update success!' });
        }).delete((_req: express.Request, res: express.Response) => {
            res.contentType("application/json");
            res.send({ 'message': 'Delete success!' });
        });
        return this.app;
    }
}