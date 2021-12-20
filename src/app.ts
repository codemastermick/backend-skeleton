import dotenv from "dotenv";
dotenv.config();
import express from "express";
import Logger from "@lib/Logger";
import morganMiddleware from "@middleware/morgan";
import { CommonRoutesConfig } from "common/common.routes.config";
import CrudRoutes from "./routes/crud/crud";
import AuthRoutes from "./auth/auth";

export default class Server {
    app: express.Express;
    port: number;
    router: express.Router;
    logger: Logger;
    routes: CommonRoutesConfig[];
    constructor() {
        this.app = express();
        this.port = Number.parseInt(process.env.PORT, 10) || 3000;
        this.router = express.Router();
        this.logger = new Logger("BACKEND-SKELETON");
        this.app.use(morganMiddleware);
        this.routes = [];

        this.app.get("/", (req: express.Request, res: express.Response) => {
            res.contentType("text");
            res.send('Welcome to the sample backend server');
        });
        this.routes.push(new CrudRoutes(this.app));
        this.routes.push(new AuthRoutes(this.app));
        // this.router.use("/auth", authSample());
        // this.router.use("/crud", crudSample());
        this.app.use(this.router);
    }

    start() {
        this.app.listen(this.port, () => {
            this.routes.forEach((route: CommonRoutesConfig) => {
                this.logger.debug(`Routes configured for ${route.getName()}`);
            });
            this.logger.info(`Server started at http://localhost:${this.port} -- Press ctrl+c to stop`);
        });
    }
}