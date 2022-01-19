import express from "express";
import Logger from "@lib/Logger";
import CommonRoutesConfig from "@lib/common.routes.config";
import morganMiddleware from "@middleware/morgan";
import errorHandler from "@middleware/error.middleware";
import PingRoutes from "@routes/ping";
import CrudRoutes from "@routes/crud";
import AuthRoutes from "@routes/auth";
export default class Server {
    app: express.Express;
    port: number;
    router: express.Router;
    logger: Logger;
    routes: CommonRoutesConfig[];
    constructor() {
        this.logger = new Logger(process.env.APP_NAME.toUpperCase().replace(/ /g, '-'));
        this.app = express();
        this.setPort();
        this.router = express.Router();
        this.app.use(morganMiddleware);
        this.app.use(express.json());

        this.routes = [];
        this.app.get("/", (_req: express.Request, res: express.Response) => {
            res.contentType("text");
            res.send(`Welcome to ${process.env.APP_NAME}`);
        });

        this.configureRoutes();
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

    private configureRoutes() {
        this.routes.push(new PingRoutes(this.app));
        this.routes.push(new AuthRoutes(this.app));
        this.routes.push(new CrudRoutes(this.app));
    }

    private validatePortNumber(num: number): boolean {
        return num > 1000 && num <= 65535;
    }

    private setPort() {
        const port = Number.parseInt(process.env.SERVER_PORT, 10);
        if (this.validatePortNumber(port)) {
            this.port = port;
        } else {
            this.logger.debug(`Port [${port}] is not usable! Please set the port to between 1001 and 65535. Continuing on port 3000`);
            this.port = 3000;
        }
    }
}