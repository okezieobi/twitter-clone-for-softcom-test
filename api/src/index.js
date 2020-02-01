import dotenv from 'dotenv';
import app from './app';
import Logger from './helpers/logger';

const { displayInfo } = Logger;

dotenv.config();

const port = process.env.PORT || '5000';
app.listen(port, () => {
  displayInfo(`App is live and listening on port ${port}!`);
});

export default app;
