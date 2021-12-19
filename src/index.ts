import 'module-alias/register';
import Logger from '@lib/Logger';
import Server from "./app";

const app = new Server();
const logger = new Logger("BACKEND-SKELETON");

logger.info("Starting server....");
app.start();