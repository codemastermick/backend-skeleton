import Logger from '@lib/Logger';

export default abstract class CommonDatabaseService {
    name: string;
    logger: Logger;

    constructor(name: string) {
        this.name = name;
        this.logger = new Logger(name);
        this.connectToDatabase();
    }

    abstract connectToDatabase(): void;
    abstract disconnectFromDatabase(): void;
    abstract create<T>(name: string, item: T, schema: any): void;
}