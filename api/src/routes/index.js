import userRouter from './users';
import tweetsOrRepliesRouter from './tweetsOrReplies';

const versionNumber = '/api/v1';

export default (app) => {
  app.use(versionNumber, userRouter);
  app.use(versionNumber, tweetsOrRepliesRouter);
};
