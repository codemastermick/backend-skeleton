import Logger from "./Logger";
import CommonDatabaseService from "./common.database.service";
import { connect, ConnectOptions, disconnect, model } from "mongoose";
import { dbURL } from "@config/database.config";
import { User, userSchema } from "../models/user";

export default class MongooseService extends CommonDatabaseService {
    logger: Logger;
    options: ConnectOptions;

    constructor() {
        super("MONGOOSE");
    }

    async connectToDatabase() {
        await connect(dbURL, this.options);
        this.logger.debug("Connected to MongoDB");
    }

    async disconnectFromDatabase() {
        await disconnect();
        this.logger.debug("Disconnected from MongoDB");
    }

    async create<T>(name: string, requestData: T): Promise<void> {
        const instance = model<T>(name, userSchema);
        const data = new instance(requestData);
        await data.save();
        this.logger.debug(`Saved new ${name}`);
        await this.connectToDatabase();
    }
}