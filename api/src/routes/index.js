import userRouter from './users';
import tweetsOrRepliesRouter from './tweetsOrReplies';
import followRouter from './follows';

const versionNumber = '/api/v1';

export default (app) => {
  app.use(versionNumber, userRouter);
  app.use(versionNumber, tweetsOrRepliesRouter);
  app.use(versionNumber, followRouter);
};
