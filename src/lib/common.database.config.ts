import Logger from '@lib/Logger';
import { Schema } from 'mongoose';

export default abstract class CommonDatabaseService {
  name: string;
  logger: Logger;

  constructor(name: string) {
    this.name = name;
    this.logger = new Logger(name);
  }

  abstract connectToDatabase(): void;
  abstract disconnectFromDatabase(): void;

  abstract create<T>(
    item: T,
    collection: string,
    schema: Schema
  ): Promise<string>;
  abstract readAll<T>(collection: string, schema: Schema): Promise<T[]>;
  abstract readOne<T>(
    collection: string,
    schema: Schema,
    queryParams: object
  ): Promise<T>;
  abstract update<T>(
    uid: string,
    item: T,
    collection: string,
    schema: Schema
  ): Promise<void>;
  abstract delete<T>(
    item: T,
    collection: string,
    schema: Schema
  ): Promise<void>;
}
