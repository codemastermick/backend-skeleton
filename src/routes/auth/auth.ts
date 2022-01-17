import { CommonRoutesConfig } from "@lib/common.routes.config";
import dotenv from "dotenv";
dotenv.config();
import express from "express";

export default class AuthRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'AuthRoutes');
    }
    configureRoutes(): express.Application {
        this.app.route("/register").post((_req: express.Request, res: express.Response) => {
            res.contentType("application/json");
            res.send({ 'message': 'Registration success!' });
        });

        this.app.route("/login").post((_req: express.Request, res: express.Response) => {
            res.contentType("application/json");
            res.send({ 'message': 'Logged In!' });
        });

        this.app.route("/logout").get((_req: express.Request, res: express.Response) => {
            res.contentType("application/json");
            res.send({ 'message': 'Logged Out!' });
        });
        return this.app;
    }
}