import { Router } from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../models/user-model';

const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  try {
    const user = await UserModel.create({
      username,
      email,
      password: hash
    });
    res.json({
      error: null,
      data: user
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

authRouter.post('/login', async (req, res) => {
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

  res.status(200).json({
    error: null,
    data: 'Welcome Home to Barcelona Hackathon'
  });
});

export { authRouter };
