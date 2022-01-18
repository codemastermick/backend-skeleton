import { StatusCodes } from "http-status-codes";
import CommonDatabaseService from '@lib/common.database.service';
import CommonRoutesConfig from '@lib/common.routes.config';
import MongooseService from '@lib/mongoose';
import { databaseEnabled } from '@config/database.config';
import express from 'express';
import DatabaseException from '../exceptions/Database';
import { User, userSchema } from "../models/user";

export default class CrudRoutes extends CommonRoutesConfig {
    dbService: CommonDatabaseService;

    constructor(app: express.Application) {
        super(app, 'CrudRoutes');
        if (databaseEnabled) {
            this.dbService = new MongooseService();
        }
    }
    configureRoutes(): express.Application {
        this.app.route("/crud").all((_req: express.Request, res: express.Response, next: express.NextFunction) => {
            if (!databaseEnabled) {
                throw new DatabaseException(StatusCodes.NOT_IMPLEMENTED, "Database is not enabled for this project. Please see src/configs/database.config.ts to enable a database.");
            }
            // add logic here to run before running http verbs, like authentication
            next();
        }).post((req: express.Request, res: express.Response) => {
            this.dbService.create<User>("Users", req.body.object, userSchema);
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