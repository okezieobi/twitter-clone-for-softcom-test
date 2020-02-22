/* eslint-disable no-underscore-dangle */
import {
  Test,
  expect,
  chai,
  chaiHttp,
  app,
  userSeeds,
  tweetSeeds,
  ObjectId,
} from '../index';

const {
  deleteData, seedUsers, generateToken, createVarChars, seedTweets, returnRandomValue,
} = Test;

chai.use(chaiHttp);

describe('Test endpoint at "/api/v1/tweets/:id" to create a tweet repl/repliesy as an authenticated User with POST', () => {
  before('Delete data before tests', async () => {
    await deleteData();
  });

  before('Seed user data before tests', async () => {
    await seedUsers();
  });

  before('Seed tweet data before tests', async () => {
    await seedTweets();
  });

  after('Delete data after tests', async () => {
    await deleteData();
  });

  it('Should create a tweet reply at "/api/v1/tweets/:id/replies" as an authenticated user with POST if all input fields are valid', async () => {
    const testData = { reply: 'First tweet reply' };
    const token = generateToken(userSeeds[0]._id);
    const tweetId = tweetSeeds[0]._id;
    const response = await chai.request(app).post(`/api/v1/tweets/${tweetId}/replies`).set('token', token).send(testData);
    expect(response).to.have.status(201);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(201);
    expect(response.body).to.have.property('data').to.be.an('object');
    expect(response.body.data).to.have.property('id').to.be.a('string');
    expect(response.body.data).to.have.property('reply').to.be.a('string').to.equal(testData.reply);
    expect(response.body.data).to.have.property('createdOn').to.be.a('string');
    expect(response.body.data).to.have.property('tweetId').to.be.a('string');
  }).timeout(3000);

  it('Should not create a tweet reply at "/api/v1/tweets/:id/replies" as an authenticated user with POST if tweet reply is a falsy value', async () => {
    const testData = { reply: returnRandomValue(undefined, null, '', NaN, 0) };
    const token = generateToken(userSeeds[0]._id);
    const tweetId = tweetSeeds[0]._id;
    const response = await chai.request(app).post(`/api/v1/tweets/${tweetId}/replies`).set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Reply is required');
  });

  it('Should not create a tweet reply at "/api/v1/tweets/:id/replies" as an authenticated user with POST if tweet reply is not sent', async () => {
    const testData = {};
    const token = generateToken(userSeeds[0]._id);
    const tweetId = tweetSeeds[0]._id;
    const response = await chai.request(app).post(`/api/v1/tweets/${tweetId}/replies`).set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Reply is required');
  });

  it('Should not create a tweet reply at "/api/v1/tweets/:id/replies" as an authenticated user with POST if tweet reply is a more than 280 characters', async () => {
    const testData = { reply: createVarChars(500) };
    const token = generateToken(userSeeds[0]._id);
    const tweetId = tweetSeeds[0]._id;
    const response = await chai.request(app).post(`/api/v1/tweets/${tweetId}/replies`).set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Reply must be less than 280 characters');
  });

  it('Should not create a tweet reply at "/api/v1/tweets/:id/replies" as an authenticated user with POST if token is an empty string', async () => {
    const testData = { reply: 'First Tweet reply' };
    const token = '';
    const tweetId = tweetSeeds[0]._id;
    const response = await chai.request(app).post(`/api/v1/tweets/${tweetId}/replies`).set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not create a tweet reply at "/api/v1/tweets/:id/replies" as an authenticated user with POST if token is not sent', async () => {
    const testData = { reply: 'First Tweet' };
    const tweetId = tweetSeeds[0]._id;
    const response = await chai.request(app).post(`/api/v1/tweets/${tweetId}/replies`).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not create a tweet reply at "/api/v1/tweets/:id/replies" as an authenticated user with POST if token does not match JWT format', async () => {
    const testData = { reply: 'First Tweet' };
    const token = createVarChars(300);
    const tweetId = tweetSeeds[0]._id;
    const response = await chai.request(app).post(`/api/v1/tweets/${tweetId}/replies`).set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token provided does not match JWT format');
  });

  it('Should not create a tweet reply at "/api/v1/tweets/:id/replies" as an authenticated user with POST if id from token does not match any user', async () => {
    const testData = { reply: 'First Tweet' };
    const token = generateToken(new ObjectId());
    const tweetId = tweetSeeds[0]._id;
    const response = await chai.request(app).post(`/api/v1/tweets/${tweetId}/replies`).set('token', token).send(testData);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token provided does not match any user');
  });

  it('Should not create a tweet reply at "/api/v1/tweets/:id/replies" as an authenticated user with POST if id from token does not match MongoDB ObjectId format', async () => {
    const testData = { reply: 'First Tweet' };
    const token = generateToken(returnRandomValue(createVarChars(12), createVarChars(24)));
    const tweetId = tweetSeeds[0]._id;
    const response = await chai.request(app).post(`/api/v1/tweets/${tweetId}/replies`).set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token does not match MongoDB ObjectId format');
  });

  it('Should not create a tweet reply at "/api/v1/tweets/:id/replies" as an authenticated user with POST if tweet id does not match MongoDB ObjectId format', async () => {
    const testData = { reply: '2ND TWEET' };
    const token = generateToken(userSeeds[0]._id);
    const tweetId = returnRandomValue(createVarChars(24), createVarChars(12));
    const response = await chai.request(app).post(`/api/v1/tweets/${tweetId}/replies`).set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Tweet id does not match MongoDB ObjectId format');
  });
});
