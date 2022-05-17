import { Router, Request, Response } from 'express';
import { login, register } from '../controllers/auth-controller';

const authRouter = Router();

/**
 * @openapi
 * /api/signup:
 *  post:
 *     tags:
 *     - Auth
 *     summary: Signup a new user
 *     parameters:
 *     - name: username
 *       in: body
 *       description: Username of the user
 *       required: true
 *       schema:
 *        type: string
 *        example: James44
 *     - name: email
 *       in: body
 *       description: Email of the user
 *       required: true
 *       schema:
 *        type: string
 *        example: james@gmail.com
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - username
 *              - email
 *              - password
 *            properties:
 *              username:
 *                type: string
 *                example: James44
 *              email:
 *                type: string
 *                example: james@email.com
 *              password:
 *                type: string
 *                example: Passw00rd
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Validation Error/Email already registered
 */
authRouter.post('/signup', (req: Request, res: Response) => register(req, res));

/**
 * @openapi
 * /api/login:
 *  post:
 *     tags:
 *     - Auth
 *     summary: Login an existing user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                example: james@gmail.com
 *              password:
 *                type: string
 *                example: Passw00rd
 *     responses:
 *      200:
 *        description: Succesful login
 *      400:
 *        description: Incorrect login details
 */
authRouter.post('/login', (req: Request, res: Response) => login(req, res));

export { authRouter };
