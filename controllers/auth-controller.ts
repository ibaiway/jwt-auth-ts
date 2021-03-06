import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import UserModel from '../models/user-model';
import schemaLogin from '../schemas/schemaLogin';
import schemaRegister from '../schemas/schemaRegister';
import signToken from '../utils/signToken';

async function register(req: Request, res: Response): Promise<Response> {
  const { error } = schemaRegister.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }
  const { username, email, password } = req.body;

  const emailExists = await UserModel.findOne({ email: email.toString() });

  if (emailExists) {
    return res.status(400).json({
      error: 'Email alredy registered'
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  let id = '';
  let idExists = true;
  while (idExists) {
    id = randomUUID();
    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      idExists = false;
    }
  }

  try {
    const user = await UserModel.create({
      _id: id,
      username: username.toString(),
      email: email.toString(),
      password: hash
    });
    const token = signToken(user._id, user.email, user.role);
    return res.status(201).json({
      error: null,
      data: { token }
    });
  } catch (e) {
    return res.status(400).json({ e });
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
  const user = await UserModel.findOne({ email: email.toString() });
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
  const token = signToken(user._id, user.email, user.role);

  return res.status(200).json({
    error: null,
    data: { token }
  });
}

export { login, register };
