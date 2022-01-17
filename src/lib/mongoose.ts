import Logger from "./Logger";
import CommonDatabaseService from "./common.database.service";
import { connect, ConnectOptions, disconnect } from "mongoose";
import { dbURL } from "@config/database.config";

export default class MongooseService extends CommonDatabaseService {
    logger: Logger;
    options: ConnectOptions;

    constructor() {
        super("MONGOOSE");
    }

    connectToDatabase() {
        connect(dbURL, this.options, () => {
            this.logger.debug("Connected to MongoDB");
        })
    }

    disconnectFromDatabase() {
        disconnect(() => {
            this.logger.debug("Disconnected from MongoDB");
        })
    }
}