import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import fileRoutes from './routes/fileRoutes';
import userRoutes from './routes/userRoutes';
import { attachUser } from './middleware/authMiddleware';
import { logger } from './utils/logger';

const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(ClerkExpressWithAuth());
app.use(attachUser);

app.use('/files', fileRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('ZenVault Backend is Running! 🚀');
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
