import dotenv from "dotenv";
dotenv.config();
import 'module-alias/register';
import Logger from '@lib/Logger';
import Server from "./server";

const server = new Server();
const logger = new Logger(process.env.APP_NAME.toUpperCase().replace(/ /g, '-'));

logger.debug(`Starting ${process.env.APP_NAME}....`);
server.start();