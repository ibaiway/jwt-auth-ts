import { Router } from 'express';
import { Request, Response } from 'express';
import { login, register } from '../controllers/auth-controller';

const authRouter = Router();

authRouter.post('/signup', (req: Request, res: Response) => register(req, res));

authRouter.post('/login', (req: Request, res: Response) => login(req, res));

export { authRouter };
