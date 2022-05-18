import { Request, Response } from 'express';
import UserModel from '../models/user-model';

async function getUsers(_req: Request, res: Response): Promise<Response> {
  const users = await UserModel.find({});

  return res.status(200).json({
    error: null,
    data: { users }
  });
}

export { getUsers };
