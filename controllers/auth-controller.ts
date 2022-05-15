import { Request, Response } from 'express';

import bcrypt from 'bcrypt';
import UserModel from '../models/user-model';
import schemaLogin from '../schemas/login-schema';
import schemaRegister from '../schemas/register-schema';

async function register(req: Request, res: Response): Promise<Response> {
  const { error } = schemaRegister.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }
  const { username, email, password } = req.body;

  const emailExists = await UserModel.findOne({ email });

  if (emailExists) {
    return res.status(400).json({
      error: 'Email alredy registered'
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  try {
    const user = await UserModel.create({
      username,
      email,
      password: hash
    });
    return res.status(201).json({
      error: null,
      data: user
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

async function login(req: Request, res: Response): Promise<Response> {
  const { error } = schemaLogin.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      error: 'Incorrect login details'
    });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      error: 'Incorrect login details'
    });
  }

  return res.status(200).json({
    error: null,
    data: 'Welcome Home to Barcelona Hackathon'
  });
}

export { login, register };
