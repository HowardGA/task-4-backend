import express from 'express';
import authRoutes from './routes/authRoute.js';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import sessionConfig from './middleware/sessionMiddleware.js';
import userRoute from './routes/userRoute.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser()); 
app.use(session(sessionConfig)); 

const corsOptions = {
  origin: 'https://task-4-frontend-one.vercel.app/', 
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoute);
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});