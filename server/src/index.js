import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import eventRouter from './events/events.router';

const initializeExpress = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use('/api', eventRouter);

  app.listen(5000, () => console.log(`REST API on http://localhost:5000/api`));
};

const initializeApp = () => {
  // Add database connection over here
  initializeExpress();
};

initializeApp();
