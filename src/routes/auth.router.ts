/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import jwt, { JwtPayload } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { authenticationEnabled } from '@config/features.config';
import CommonRoutesConfig from '@lib/common.routes.config';
import ApplicationException from '../exceptions/ApplicationException';
import express from 'express';
import CommonDatabaseService from '@lib/common.database.config';
import MongoDbService from '@lib/mongodb';
import { User } from 'models/user.model';
import { userSchema } from '../schemas/user.schema';
import { tokenExpiryLength } from '@config/authentication.config';

const createAccessToken = (user: User) => {
  return jwt.sign(
    { username: user.username, role: user.role },
    process.env.JWT_SIGNING_SECRET,
    { expiresIn: tokenExpiryLength }
  );
};

const featureError = new ApplicationException(
  StatusCodes.NOT_IMPLEMENTED,
  'Authentication is not enabled for this project. Please see src/configs/features.config.ts to enable a database.'
);

export default class AuthRouter extends CommonRoutesConfig {
  dbService: CommonDatabaseService;
  refreshTokens: string[];

  constructor(app: express.Application) {
    super(app, 'AUTH');
    this.dbService = new MongoDbService();
    this.refreshTokens = [];
  }
  configureRoutes(): express.Application {
    this.app
      .route('/register')
      .post(async (req: express.Request, res: express.Response) => {
        if (!authenticationEnabled) {
          throw featureError;
        }

        const username: string = req.body.username as string;
        const password: string = req.body.password as string;

        const user: User = {
          uid: 'generate-uid-here',
          username,
          password,
          displayName: username,
          email: '',
          avatarUrl: '',
          role: 'member'
        };
        await this.dbService.create<User>(user, 'User', userSchema);

        res.contentType('application/json');
        res.status(StatusCodes.CREATED);
        const accessToken = createAccessToken(user);

        res.json({
          accessToken
        });
      });

    this.app
      .route('/login')
      .post(async (req: express.Request, res: express.Response) => {
        if (!authenticationEnabled) {
          throw featureError;
        }
        res.contentType('application/json');

        // Read username and password from request body
        const username: string = req.body.username as string;
        const password: string = req.body.password as string;

        const user = await this.dbService.readOne<User>('User', userSchema, {
          username,
          password
        });

        if (user) {
          // Generate an access token
          const accessToken = createAccessToken(user);
          const refreshToken = jwt.sign(
            { username: user.username, role: user.role },
            process.env.JWT_REFRESH_SECRET
          );
          this.refreshTokens.push(refreshToken);
          this.logger.debug(this.refreshTokens.toString());

          res.json({
            accessToken,
            refreshToken
          });
        } else {
          res.status(StatusCodes.NOT_FOUND);
          res.send({ message: 'Username or password incorrect' });
        }
      });

    this.app.post('/token', (req: express.Request, res: express.Response) => {
      const token: string = req.body.token as string;

      if (!token) {
        return res.sendStatus(StatusCodes.UNAUTHORIZED);
      }

      if (!this.refreshTokens.includes(token)) {
        return res.sendStatus(StatusCodes.FORBIDDEN);
      }

      jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET,
        (err: Error, user: JwtPayload) => {
          if (err) {
            return res.sendStatus(StatusCodes.FORBIDDEN);
          }

          const accessToken = jwt.sign(
            { username: user.username as string, role: user.role as string },
            process.env.JWT_SIGNING_SECRET,
            { expiresIn: tokenExpiryLength }
          );

          res.json({
            accessToken
          });
        }
      );
    });

    this.app
      .route('/logout')
      .post((req: express.Request, res: express.Response) => {
        if (!authenticationEnabled) {
          throw featureError;
        }

        const token: string = req.body.token as string;
        if (token) {
          this.refreshTokens = this.refreshTokens.filter((t) => t !== token);
          this.logger.debug(this.refreshTokens.toString());

          res.contentType('application/json');
          res.send({ message: 'Logged Out!' });
        } else {
          res.sendStatus(StatusCodes.UNAUTHORIZED);
        }
      });

    return this.app;
  }
}
