import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';

export const auth = passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('secret_token'),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
