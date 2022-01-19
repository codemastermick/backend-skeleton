import Logger from '@lib/Logger';

export default abstract class CommonDatabaseService {
    name: string;
    logger: Logger;

    constructor(name: string) {
        this.name = name;
        this.logger = new Logger(name);
    }

    abstract connectToDatabase(): void;
    abstract disconnectFromDatabase(): void;

    abstract create<T>(item: T, collection: string, schema: any): Promise<void>;
    abstract readAll<T>(collection: string, schema: any): Promise<T[]>;
    abstract readOne<T>(uid: string, collection: string, schema: any): Promise<T>;
    abstract update<T>(uid: string, item: T, collection: string, schema: any): Promise<void>;
    abstract delete<T>(item: T, collection: string, schema: any): Promise<void>;
}