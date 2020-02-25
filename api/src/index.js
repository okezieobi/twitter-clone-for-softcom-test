/* eslint-disable no-console */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';
import ErrMessages from './errors/extended';

const { consoleError, consoleWarn } = ErrMessages;

dotenv.config();

const startApp = async () => {
  try {
    mongoose.connect(process.env.MONGODB_ATLAS_URL || process.env.MONGODB_DEV_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      });
    const db = mongoose.connection;
    await db.once('open', () => consoleWarn('connected to database'));
    const port = process.env.PORT || '5000';
    app.listen(port, () => consoleWarn(`App is live and listening on port ${port}!`));
  } catch (error) {
    throw consoleError(error);
  }
};


startApp();

export default app;
