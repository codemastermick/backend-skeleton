import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authSample from "./auth/auth";
import crudSample from "./crud/crud";

export default class Server {
    app: express.Express;
    port: number;
    router: express.Router;

    constructor() {
        this.app = express();
        this.port = Number.parseInt(process.env.PORT, 10) || 3000;
        this.router = express.Router();

        this.app.get("/", (req, res) => {
            res.contentType("json");
            res.send({ 'message': 'Welcome to the sample backend server' });
        });

        this.router.use("/auth", authSample());
        this.router.use("/crud", crudSample());
    }

    start() {
        this.app.listen(this.port, () => {
            // eslint-disable-next-line no-console
            console.log(`Server started at http://localhost:${this.port} -- Press ctrl+c to stop`);
        });
    }
}