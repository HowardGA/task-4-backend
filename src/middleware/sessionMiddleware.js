import crypto from 'crypto';

const isProduction = process.env.NODE_ENV === 'production';

const sessionConfig = {
  name: 'user.sid',
  secret: process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex'),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000,
  },
};

export default sessionConfig;