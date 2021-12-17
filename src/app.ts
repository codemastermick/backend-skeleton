import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authSample from "./auth/auth";
import crudSample from "./crud/crud";
import Logger from "@lib/Logger";

export default class Server {
    app: express.Express;
    port: number;
    router: express.Router;

    constructor() {
        this.app = express();
        this.port = Number.parseInt(process.env.PORT, 10) || 3000;
        this.router = express.Router();

        this.app.get("/", (req, res) => {
            res.contentType("text");
            res.send('Welcome to the sample backend server');
        });

        this.router.use("/auth", authSample());
        this.router.use("/crud", crudSample());
    }

    start() {
        this.app.listen(this.port, () => {
            Logger.info(`Server started at http://localhost:${this.port} -- Press ctrl+c to stop`);
        });
    }
}