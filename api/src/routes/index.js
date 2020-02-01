import userRouter from './users';

const versionNumber = '/api/v1';

export default (app) => {
  app.use(versionNumber, userRouter);
};
