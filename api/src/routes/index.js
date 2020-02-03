import userRouter from './users';
import tweetRouter from './tweets';

const versionNumber = '/api/v1';

export default (app) => {
  app.use(versionNumber, userRouter);
  app.use(versionNumber, tweetRouter);
};
