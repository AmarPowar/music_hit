import express from 'express';
import musicRoute from './routes/song.route';
import artistRoute from './routes/artist.route';
import mongoose from 'mongoose';
import importCsvFile from './config/importData';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

const app = express();
app.use(bodyParser.json());
const port = 3000;

app.get('/api/importCsv', async (req, res, next) => {
  const filePath = path.join(__dirname, 'music-ekspres.csv');
  await importCsvFile(filePath);
});
app.use('/api/song', musicRoute);
app.use('/api/artist', artistRoute);

mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(async () => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  });
