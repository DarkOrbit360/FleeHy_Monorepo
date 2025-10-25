
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import tripsRouter from './api/v1/trips/index.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: '*', credentials: false }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/v1/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/v1/trips', tripsRouter);

app.use((err, _req, res, _next) => {
  console.error('[ERROR]', err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
