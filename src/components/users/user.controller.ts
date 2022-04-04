import { Request, Response } from 'express';
import User from './user.model';
import jwt from 'jsonwebtoken';

function generateToken(data: object) {
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

export const getUsers = async (_: Request, res: Response) => {
  const users = await User.find({}, '-password');
  res.status(200).json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const { username } = req.params;
  const user = await User.findOne({ username }, '-password');

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json('User not found');
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { username } = req.params;
  const user = await User.findOne({ username });

  if (user) {
    await user.delete();
    res.status(200).json('User deleted');
  } else {
    res.status(400).json('User not found');
  }
};

export const editUser = async (req: Request, res: Response) => {
  const { username } = req.params;
  const body = req.body;
  const user = await User.findOneAndUpdate({ username }, body, { new: true });
  res.status(200).json(user);
};
