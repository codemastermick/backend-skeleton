import { StatusCodes } from "http-status-codes";
import { authenticationEnabled } from "@config/features.config";
import CommonRoutesConfig from "@lib/common.routes.config";
import ApplicationException from "../exceptions/Application";
import express from "express";

export default class AuthRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'AuthRoutes');
    }
    configureRoutes(): express.Application {
        this.app.route("/register").post((_req: express.Request, res: express.Response) => {
            if (!authenticationEnabled) {
                throw new ApplicationException(StatusCodes.NOT_IMPLEMENTED, "Authentication is not enabled for this project. Please see src/configs/features.config.ts to enable a database.");
            }
            res.contentType("application/json");
            res.send({ 'message': 'Registration success!' });
        });

        this.app.route("/login").post((_req: express.Request, res: express.Response) => {
            if (!authenticationEnabled) {
                throw new ApplicationException(StatusCodes.NOT_IMPLEMENTED, "Authentication is not enabled for this project. Please see src/configs/features.config.ts to enable a database.");
            }
            res.contentType("application/json");
            res.send({ 'message': 'Logged In!' });
        });

        this.app.route("/logout").get((_req: express.Request, res: express.Response) => {
            if (!authenticationEnabled) {
                throw new ApplicationException(StatusCodes.NOT_IMPLEMENTED, "Authentication is not enabled for this project. Please see src/configs/features.config.ts to enable a database.");
            }
            res.contentType("application/json");
            res.send({ 'message': 'Logged Out!' });
        });

        this.app.route("/forgot-password").get((_req: express.Request, res: express.Response) => {
            if (!authenticationEnabled) {
                throw new ApplicationException(StatusCodes.NOT_IMPLEMENTED, "Authentication is not enabled for this project. Please see src/configs/features.config.ts to enable a database.");
            }
            res.contentType("application/json");
            res.send({ 'message': 'Password reset emails not implemented yet!' });
        });
        return this.app;
    }
}