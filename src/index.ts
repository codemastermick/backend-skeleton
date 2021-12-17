import 'module-alias/register';
import Logger from '@lib/Logger';
import Server from "./app";

const app = new Server();

Logger.info("Starting server....");
app.start();