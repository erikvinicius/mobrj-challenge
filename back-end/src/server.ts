import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import mongoose from './database';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

if (process.env.DB) {
  mongoose.connect(process.env.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
  global.Promise = mongoose.Promise;
}

app.listen(3333, () => {
  console.log('🚀 server started on port 3333!');
});
