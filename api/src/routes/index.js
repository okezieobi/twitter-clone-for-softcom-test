import userRouter from './users';
import tweetAndReplyRouter from './tweetsAndReplies';

const versionNumber = '/api/v1';

export default (app) => {
  app.use(versionNumber, userRouter);
  app.use(versionNumber, tweetAndReplyRouter);
};
