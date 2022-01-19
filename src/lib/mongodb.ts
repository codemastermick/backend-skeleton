import { connect, ConnectOptions, disconnect, Model, model, NativeError, UpdateWriteOpResult } from "mongoose";
import Logger from "./Logger";
import CommonDatabaseService from "./common.database.service";
import { dbURL } from "@config/database.config";

export default class MongoDbService extends CommonDatabaseService {
    logger: Logger;
    options: ConnectOptions;

    constructor() {
        super("MONGODB");
    }

    async connectToDatabase(): Promise<void> {
        await connect(dbURL, this.options);
        this.logger.debug("Connected to MongoDB");
    }

    async disconnectFromDatabase(): Promise<void> {
        await disconnect();
        this.logger.debug("Disconnected from MongoDB");
    }

    async create<T>(item: T, collection: string, schema: any): Promise<void> {
        await this.connectToDatabase();
        const dataModel: Model<T> = model<T>(collection, schema);
        const m = new dataModel(item);
        await m.save();
        this.logger.debug("Saved item");
        await this.disconnectFromDatabase();
    }

    async readAll<T>(collection: string, schema: any): Promise<T[]> {
        await this.connectToDatabase();
        const dataModel: Model<T> = model<T>(collection, schema);
        const results = await dataModel.find();
        this.logger.debug("Retrieved collection of items from database");
        await this.disconnectFromDatabase();
        return results as T[];
    }

    async readOne<T>(collection: string, uid: string, schema: any): Promise<T> {
        await this.connectToDatabase();
        const m: Model<T> = model<T>(collection, schema);
        const results = await m.find({ uid });
        this.logger.debug("Retrieved item from database");
        await this.disconnectFromDatabase();
        return results[0] as T;
    }

    async update<T>(uid: string, item: T, collection: string, schema: any): Promise<void> {
        await this.connectToDatabase();
        const dataModel: Model<T> = model<T>(collection, schema);
        await dataModel.updateOne({ uid }, item, async (err: NativeError, res: UpdateWriteOpResult) => {
            if (err) {
                this.logger.error(err.message);
            }
            if (res.acknowledged) {
                this.logger.debug(`Updated ${uid}`);
            }
            await this.disconnectFromDatabase();
        });
    }

    async delete<T>(item: T, collection: string, schema: any): Promise<void> {
        await this.connectToDatabase();
        const dataModel: Model<T> = model<T>(collection, schema);
        await dataModel.deleteOne(item, (err: NativeError) => {
            if (err) {
                this.logger.error(err.message);
            }
        });
        this.logger.debug("Deleted item");
        await this.disconnectFromDatabase();
    }

}