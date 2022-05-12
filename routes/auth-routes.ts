import { Router } from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../models/user-model';

const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await UserModel.create({
      username,
      email,
      password: encryptedPassword
    });
    res.json({
      error: null,
      data: user
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

export { authRouter };
