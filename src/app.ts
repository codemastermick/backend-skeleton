import dotenv from "dotenv";
dotenv.config();
import express from "express";
import Logger from "@lib/Logger";
import morganMiddleware from "@middleware/morgan";
import { CommonRoutesConfig } from "@lib/common.routes.config";
import CrudRoutes from "./routes/crud/crud";
import AuthRoutes from "@lib/auth/auth";
import errorHandler from "@middleware/ErrorHandler";
export default class Server {
    app: express.Express;
    port: number;
    router: express.Router;
    logger: Logger;
    routes: CommonRoutesConfig[];
    constructor() {
        this.app = express();
        this.logger = new Logger("BACKEND-SKELETON");
        const port = Number.parseInt(process.env.PORT, 10);
        if (this.validatePortNumber(port)) {
            this.port = port;
        } else {
            this.logger.debug(`Port [${port}] is not usable! Please set the port to between 1001 and 65535. Continuing on port 3000`);
            this.port = 3000;
        }
        this.router = express.Router();
        this.app.use(morganMiddleware);

        this.routes = [];
        this.app.get("/", (_req: express.Request, res: express.Response) => {
            res.contentType("text");
            res.send('Welcome to the sample backend server');
        });

        this.routes.push(new CrudRoutes(this.app));
        this.routes.push(new AuthRoutes(this.app));

        this.app.use(this.router);
        this.app.use(errorHandler);
    }

    start() {
        this.app.listen(this.port, () => {
            this.routes.forEach((route: CommonRoutesConfig) => {
                this.logger.debug(`Routes configured for ${route.getName()}`);
            });
            this.logger.debug(`Server started at http://localhost:${this.port} -- Press ctrl+c to stop`);
        });
    }

    private validatePortNumber(num: number): boolean {
        return num > 1000 && num <= 65535;
    }
}