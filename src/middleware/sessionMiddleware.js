const isProduction = process.env.NODE_ENV === 'production';

if (!process.env.SESSION_SECRET) {
  throw new Error('Missing SESSION_SECRET env variable');
}

const sessionConfig = {
  name: 'user.sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000, 
    domain: isProduction ? 'task-4-backend-six.vercel.app' : undefined,
  },
};

export default sessionConfig;
