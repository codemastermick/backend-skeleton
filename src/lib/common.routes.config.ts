import Logger from '@lib/Logger';
import express from 'express';
export default abstract class CommonRoutesConfig {
    app: express.Application;
    name: string;
    logger: Logger;

    constructor(app: express.Application, name: string) {
        this.app = app;
        this.name = name;
        this.logger = new Logger(name);
        this.configureRoutes();
    }
    getName() {
        return this.name;
    }

    abstract configureRoutes(): express.Application;
}