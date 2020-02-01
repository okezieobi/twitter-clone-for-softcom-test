import dotenv from 'dotenv';
import app from './app';
import logger from './helpers/logger';

dotenv.config();

const port = process.env.PORT || '5000';
app.listen(port, () => {
  logger.displayInfo(`App is live and listening on port ${port}!`);
});

export default app;
