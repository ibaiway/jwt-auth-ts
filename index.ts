import express, { Application, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import swaggerDocs from './swagger';
import { authRouter } from './routes/auth-routes';
import connect from './db/connect';
import CONFIG from './config/config';
import { verifyToken } from './middlewares/auth-middleware';
import { seeder } from './db/seed';
import { getUsers } from './controllers/user-controller';

const app: Application = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', authRouter);

/**
 * @openapi
 * /api/users:
 *  get:
 *     tags:
 *     - Users
 *     summary: Get Users
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *          type: string
 *          format: Bearer
 *          required: true
 *
 *     responses:
 *      200:
 *        description: Returns array of users
 *        content:
 *         application/json:
 *          schema:
 *           type: array
 *           items:
 *            schema:
 *              id: string
 *              username: string
 *          example:
 *           id: "a40e2187-4aad-47a5-8912-e71d0a2784e7"
 *           username: "James44"
 *           email:  "james@gmail.com"
 *           password: "018599d4-e455-4a1f-a69f-0dcd33f8452d"
 *      401:
 *        description: Unauthorized
 */
app.get(
  '/api/users',
  (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req, res, next),
  (req: Request, res: Response) => {
    getUsers(req, res);
  }
);

connect()
  .then(() => console.log('DB Connected'))
  .catch((e) => console.log(`Error in DB: ${e}`));

seeder();

app.listen(CONFIG.PORT, (): void => {
  console.log(`The application is listening on port ${CONFIG.PORT}!`);
  swaggerDocs(app, CONFIG.PORT);
});
