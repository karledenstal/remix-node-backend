import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from 'morgan';
import { connectDB as connect } from './db/connect';
import userRoutes from './components/users/user.routes';
import authRoutes from './components/auth/auth.routes';
import passport from './middleware/passport';

dotenv.config();

const port = process.env.PORT || 9000;

const app = express();

app.use(logger(':method :url :status - :response-time ms - :date'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.set('port', port);

app.use(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  userRoutes
);
app.use('/api/auth', authRoutes);

app.listen(app.get('port'), async () => {
  await connect();
  console.log('🚀 Connection successful on', app.get('port'));
});
