import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import notFound from './middleware/notFound';
import errorHandler from './middleware/errorHandler';
import CustomError from './errors/CustomError';
import { checkConnection } from './db/database';
import MainRouter from './routes/MainRoute';

dotenv.config();
const { WEBSITE_URL } = process.env;
const PORT = process.env.PORT ?? 3000;
const app = express();
app.use(
  cors({
    origin: WEBSITE_URL,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use('/', MainRouter);

app.use(notFound);
app.use(errorHandler);
const start = async () => {
  try {
    await checkConnection();
    app.listen(PORT, () => {
      console.log(`Server listening at port: ${PORT}`);
    });
  } catch (error: any) {
    throw new CustomError(
      500,
      error?.sqlMessage ?? error?.message ?? 'Internal server error'
    );
  }
};
start();
