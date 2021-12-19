import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authSample from "./auth/auth";
import crudSample from "./crud/crud";
import Logger from "@lib/Logger";
import morganMiddleware from "@middleware/morgan";

export default class Server {
    app: express.Express;
    port: number;
    router: express.Router;
    logger: Logger;
    constructor() {
        this.app = express();
        this.port = Number.parseInt(process.env.PORT, 10) || 3000;
        this.router = express.Router();
        this.logger = new Logger("BACKEND-SKELETON");
        this.app.use(morganMiddleware);

        this.app.get("/", (req: express.Request, res: express.Response) => {
            res.contentType("text");
            res.send('Welcome to the sample backend server');
        });

        this.router.use("/auth", authSample());
        this.router.use("/crud", crudSample());
        this.app.use(this.router);
    }

    start() {
        this.app.listen(this.port, () => {
            this.logger.info(`Server started at http://localhost:${this.port} -- Press ctrl+c to stop`);
        });
    }
}