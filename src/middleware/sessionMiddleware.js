import crypto from 'crypto';


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
  store: process.env.NODE_ENV === 'production' ? 
    new (require('connect-redis')(session))({ 
      client: redisClient,
      ttl: 86400 
    }) : 
    undefined
};

export default sessionConfig;