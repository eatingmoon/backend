import express from 'express';
import mongoose from 'mongoose';

import helmet from 'helmet';
import cors from 'cors';
import bearerToken from 'express-bearer-token';
// @ts-ignored
import errorToSlack from 'express-error-slack';
import { errorHandler } from './middlewares';

import RootRouter from './routes';
import AuthRouter from './routes/auth';
import ExhibitionRouter from './routes/exhibition';
import PieceRouter from './routes/piece';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();

    this.initializeMiddlewares();
    this.connectMongoDB();
    this.initializeRouter();
    this.initialErrorHandler();
  }

  private initializeMiddlewares() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      bearerToken({
        bodyKey: 'token',
        headerKey: 'Bearer',
      }),
    );
  }

  // eslint-disable-next-line class-methods-use-this
  private connectMongoDB() {
    const mongooseOption = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };

    mongoose.connect(
      `mongodb://localhost:27017/test?readPreference=primary&appname=MongoDB%20Compass&ssl=false`,
      mongooseOption,
    );
  }

  private initializeRouter() {
    this.app.use('/', RootRouter);
    this.app.use('/auth', AuthRouter);
    this.app.use('/exhibition', ExhibitionRouter);
    this.app.use('/piece', PieceRouter);
  }

  private initialErrorHandler() {
    this.app.use(
      errorToSlack({
        webhookUri: process.env.SLACK_WEBHOOK_URI,
      }),
    );
    this.app.use(errorHandler);
  }
}

export default App;
