import { Request, Response } from 'express';
import User from '../users/user.model';
import jwt from 'jsonwebtoken';

function generateToken(data: object): string {
  return jwt.sign(data, `${process.env.JWT_SECRET}`, { expiresIn: '30d' });
}

export const signup = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json('User already exists');
    return;
  }

  const user = await User.create({ email, username, password });

  if (user) {
    const data = {
      _id: user.id,
      username: user.username,
      email: user.email,
    };

    res.status(200).json({
      ...data,
      token: generateToken(data),
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.verifyPassword(password))) {
    const data = {
      _id: user.id,
      name: user.username,
      email: user.email,
    };

    res.status(200).json({
      ...data,
      token: generateToken(data),
    });
  } else {
    res.status(400).json('Invalid credentials');
  }
};
