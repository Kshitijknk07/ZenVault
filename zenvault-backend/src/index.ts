import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import fileRoutes from './routes/fileRoutes';

const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/files', fileRoutes); 

app.get('/', (req, res) => {
  res.send('ZenVault Backend is Running! 🚀');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
