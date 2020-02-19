/* eslint-disable no-console */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config();


const startApp = async () => {
  try {
    mongoose.connect(process.env.MONGODB_DEV_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      });
    const db = mongoose.connection;
    await db.once('open', () => console.warn('connected to database'));
    const port = process.env.PORT || '5000';
    app.listen(port, () => console.warn(`App is live and listening on port ${port}!`));
  } catch (error) {
    console.error(error);
  }
};


startApp();

export default app;
