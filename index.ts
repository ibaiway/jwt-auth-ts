import express, { Application, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { authRouter } from './routes/auth-routes';
import connect from './db/connect';
import CONFIG from './config/config';
import verifyToken from './middlewares/auth-middleware';

const app: Application = express();
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/user', authRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Well done!');
});

app.get(
  '/private',
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req, res, next),
  (req: Request, res: Response) => {
    res.send('CONGRATULATIONS!');
  }
);
connect()
  .then(() => console.log('DB Connected'))
  .catch((e) => console.log(`Error in DB: ${e}`));

app.listen(CONFIG.PORT, (): void => {
  console.log(`The application is listening on port ${CONFIG.PORT}!`);
});
