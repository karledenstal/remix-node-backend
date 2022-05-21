import { Strategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import User from '../components/users/user.model';

export default passport.use(
  new Strategy(
    {
      secretOrKey: `${process.env.JWT_SECRET}`,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      const { _id } = token;

      try {
        const user = await User.findById({ _id }, '-password');
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (e) {
        return done(e, false);
      }
    }
  )
);
