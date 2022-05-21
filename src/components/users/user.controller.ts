import { Request, Response } from 'express';
import User from './user.model';

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
