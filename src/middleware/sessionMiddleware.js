import crypto from 'crypto';
import session from 'express-session';

let store;

if (process.env.NODE_ENV === 'production') {
  const RedisStore = (await import('connect-redis')).default;
  store = new RedisStore({
    client: redisClient,
    ttl: 86400
  });
}

const sessionConfig = {
  name: 'user.sid',
  secret: process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex'),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000,
    domain: process.env.NODE_ENV === 'production' ? '.yourdomain.com' : 'localhost'
  },
  store
};

export default sessionConfig;
