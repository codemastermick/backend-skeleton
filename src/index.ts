import dotenv from "dotenv";
dotenv.config();
import 'module-alias/register';
import Logger from '@lib/Logger';
import Server from "./app";

const app = new Server();
const logger = new Logger(process.env.APP_NAME.toUpperCase().replace(/ /g, '-'));

logger.debug("Starting server....");
app.start();