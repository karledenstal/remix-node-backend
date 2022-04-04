import { Schema, model, Model, Document } from 'mongoose';
import * as argon2 from 'argon2';

interface IUser {
  email: string;
  password: string;
  username: string;
}

export interface IUserDocument extends IUser, Document {
  verifyPassword: (pwd: string) => Promise<boolean>;
}

const User: Schema<IUserDocument> = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    username: {
      type: String,
      required: [true, 'Please add a username'],
    },
  },
  {
    timestamps: true,
  }
);

User.pre<IUserDocument>('save', async function (next) {
  try {
    if (this.isModified('password')) {
      this.password = await argon2.hash(this.password);
    }
  } catch (e) {
    next();
  }
});

User.methods.verifyPassword = async function (pwd: string) {
  const match = await argon2.verify(this.password, pwd);
  return match;
};

export default model<IUserDocument, Model<IUserDocument>>('User', User);
