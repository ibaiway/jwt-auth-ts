import express, { Application, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { authRouter } from './routes/auth-routes';
import connect from './db/connect';
import CONFIG from './config/config';
import { verifyToken } from './middlewares/auth-middleware';
import { seedAdmin } from './db/seed';
import { jobxUsers } from './db/jobx-users';

const app: Application = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', authRouter);

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello Barcelona!');
});

app.get(
  '/api/users',
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req, res, next),
  (_req: Request, res: Response) => {
    res.json({ data: jobxUsers });
  }
);

connect()
  .then(() => console.log('DB Connected'))
  .catch((e) => console.log(`Error in DB: ${e}`));

seedAdmin();

app.listen(CONFIG.PORT, (): void => {
  console.log(`The application is listening on port ${CONFIG.PORT}!`);
});
