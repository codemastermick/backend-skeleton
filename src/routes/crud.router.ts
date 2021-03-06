import { StatusCodes } from 'http-status-codes';
import CommonDatabaseService from '@lib/common.database.config';
import CommonRoutesConfig from '@lib/common.routes.config';
import MongoDBService from '@lib/mongodb';
import { databaseEnabled } from '@config/features.config';
import express from 'express';
import DatabaseException from '../exceptions/DatabaseException';
import { User } from '../models/user.model';
import { userSchema } from '../schemas/user.schema';

export default class CrudRouter extends CommonRoutesConfig {
  dbService: CommonDatabaseService;

  constructor(app: express.Application) {
    super(app, 'CrudRoutes');
    if (databaseEnabled) {
      this.dbService = new MongoDBService();
    }
  }
  configureRoutes(): express.Application {
    this.app
      .route('/crud')
      .all(
        (
          _req: express.Request,
          _res: express.Response,
          next: express.NextFunction
        ) => {
          if (!databaseEnabled) {
            throw new DatabaseException(
              StatusCodes.NOT_IMPLEMENTED,
              'Database is not enabled for this project. Please see src/configs/features.config.ts to enable a database.'
            );
          }
          // add logic here to run before running http verbs, like authentication
          next();
        }
      )
      .post(async (req: express.Request, res: express.Response) => {
        await this.dbService.create<User>(req.body, 'Users', userSchema);
        res.contentType('application/json');
        res.status(StatusCodes.CREATED);
        res.send({ message: 'Create success!' });
      })
      .get((_req: express.Request, res: express.Response) => {
        res.contentType('application/json');
        res.send({ message: 'Read success!' });
      })
      .put((_req: express.Request, res: express.Response) => {
        res.contentType('application/json');
        res.send({ message: 'Update success!' });
      })
      .delete((_req: express.Request, res: express.Response) => {
        res.contentType('application/json');
        res.send({ message: 'Delete success!' });
      });
    return this.app;
  }
}
