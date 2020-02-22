/* eslint-disable no-underscore-dangle */
import {
  Test,
  expect,
  chai,
  chaiHttp,
  app,
  userSeeds,
  tweetReplySeeds,
  tweetSeeds,
  ObjectId,
} from '../index';

const {
  deleteData, seedUsers, generateToken, createVarChars,
  seedTweets, seedTweetReplies, getRandomArrayIndex, returnRandomValue,
} = Test;

chai.use(chaiHttp);

describe('Test endpoint at "/api/v1/searches" to search users, tweets and replies as authenticated User with POST', () => {
  before('Delete data before tests', async () => {
    await deleteData();
  });

  before('Seed user data before tests', async () => {
    await seedUsers();
  });

  before('Seed tweet data before tests', async () => {
    await seedTweets();
  });

  before('Seed tweet reply data before tests', async () => {
    await seedTweetReplies();
  });

  after('Delete data after tests', async () => {
    await deleteData();
  });

  it('Should search users, tweets and replies at "/api/v1/searches" as authenticated User with POST if all input fields are valid', async () => {
    const testData = {
      search: returnRandomValue(tweetSeeds[0].tweet,
        userSeeds[0].username, tweetReplySeeds[0].reply),
    };
    const token = generateToken(userSeeds[0]._id);
    const response = await chai.request(app).post('/api/v1/searches').set('token', token).send(testData);
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(200);
    expect(response.body).to.have.property('data').to.be.an('object');
    expect(response.body.data).to.have.property('userSearchRes').to.be.an('array');
    const { userSearchRes } = response.body.data;
    const randomUserResIndex = getRandomArrayIndex(userSearchRes);
    if (userSearchRes.length > 0) {
      expect(response.body.data.userSearchRes[randomUserResIndex]).to.have.property('id').to.be.a('string');
      expect(response.body.data.userSearchRes[randomUserResIndex]).to.have.property('fullName').to.be.a('string');
      expect(response.body.data.userSearchRes[randomUserResIndex]).to.have.property('username').to.be.a('string');
      expect(response.body.data.userSearchRes[randomUserResIndex]).to.have.property('email').to.be.a('string');
      expect(response.body.data.userSearchRes[randomUserResIndex]).to.have.property('type').to.be.a('string').to.equal('Client');
      expect(response.body.data.userSearchRes[randomUserResIndex]).to.have.property('createdOn').to.be.a('string');
      expect(response.body.data.userSearchRes[randomUserResIndex]).to.have.property('followings').to.be.a('number');
      expect(response.body.data.userSearchRes[randomUserResIndex]).to.have.property('followers').to.be.a('number');
    }
    expect(response.body.data).to.have.property('tweetSearchRes').to.be.an('array');
    const { tweetSearchRes } = response.body.data;
    const randomTweetResIndex = getRandomArrayIndex(tweetSearchRes);
    if (tweetSearchRes.length > 0) {
      expect(response.body.data.tweetSearchRes[randomTweetResIndex]).to.have.property('id').to.be.a('string');
      expect(response.body.data.tweetSearchRes[randomTweetResIndex]).to.have.property('tweet').to.be.a('string');
      expect(response.body.data.tweetSearchRes[randomTweetResIndex]).to.have.property('createdOn').to.be.a('string');
    }
    expect(response.body.data).to.have.property('tweetReplySearchRes').to.be.an('array');
    const { tweetReplySearchRes } = response.body.data;
    const randomReplyResIndex = getRandomArrayIndex(tweetReplySearchRes);
    if (tweetReplySearchRes.length > 0) {
      expect(response.body.data.tweetReplySearchRes[randomReplyResIndex]).to.have.property('id').to.be.a('string');
      expect(response.body.data.tweetReplySearchRes[randomReplyResIndex]).to.have.property('reply').to.be.a('string');
      expect(response.body.data.tweetReplySearchRes[randomReplyResIndex]).to.have.property('createdOn').to.be.a('string');
    }
  });

  it('Should NOT search for tweets, users, replies at "/api/v1/searches" as an authenticated user if search input is a falsy value', async () => {
    const testData = { search: returnRandomValue('', undefined, null, 0, NaN) };
    const token = generateToken(userSeeds[0]._id);
    const response = await chai.request(app).post('/api/v1/searches').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Search is required');
  });

  it('Should NOT search for tweets, users, replies at "/api/v1/searches" as an authenticated user if search input is not sent', async () => {
    const token = generateToken(userSeeds[0]._id);
    const response = await chai.request(app).post('/api/v1/searches').set('token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Search is required');
  });

  it('Should NOT search for tweets, users, replies at "/api/v1/searches" as an authenticated user if search input is not string data type', async () => {
    const testData = { search: 2000 };
    const token = generateToken(userSeeds[0]._id);
    const response = await chai.request(app).post('/api/v1/searches').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Search must be string data type');
  });

  it('Should NOT search for tweets, users, replies at "/api/v1/searches" as an authenticated user if search input is more than 128 characters', async () => {
    const testData = { search: createVarChars(200) };
    const token = generateToken(userSeeds[0]._id);
    const response = await chai.request(app).post('/api/v1/searches').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Search must be less than 128 characters');
  });

  it('Should NOT search for tweets, users, replies at "/api/v1/searches" as an authenticated user if search input does not have ny matches', async () => {
    const testData = { search: createVarChars(50) };
    const token = generateToken(userSeeds[0]._id);
    const response = await chai.request(app).post('/api/v1/searches').set('token', token).send(testData);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal(`No search results for ${testData.search}`);
  });

  it('Should NOT search for tweets, users, replies at "/api/v1/searches" as an authenticated user if token is an empty string', async () => {
    const testData = { search: returnRandomValue('This is my first tweet', 'Obiedere', 'This is my 1st reply to a tweet') };
    const token = '';
    const response = await chai.request(app).post('/api/v1/searches').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should NOT search for tweets, users, replies at "/api/v1/searches" as an authenticated user if token is not sent', async () => {
    const testData = { search: returnRandomValue('This is my first tweet', 'Obiedere', 'This is my 1st reply to a tweet') };
    const response = await chai.request(app).post('/api/v1/searches').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should NOT search for tweets, users, replies at "/api/v1/searches" as an authenticated user if token does not match JWT format', async () => {
    const testData = { search: returnRandomValue('This is my first tweet', 'Obiedere', 'This is my 1st reply to a tweet') };
    const token = createVarChars(300);
    const response = await chai.request(app).post('/api/v1/searches').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token provided does not match JWT format');
  });

  it('Should NOT search for tweets, users, replies at "/api/v1/searches" as an authenticated user if id from token does not match any user', async () => {
    const testData = { search: returnRandomValue('This is my first tweet', 'Obiedere', 'This is my 1st reply to a tweet') };
    const token = generateToken(new ObjectId());
    const response = await chai.request(app).post('/api/v1/searches').set('token', token).send(testData);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token provided does not match any user');
  });

  it('Should NOT search for tweets, users, replies at "/api/v1/searches" as an authenticated user if id from token does not much MongoDB ObjectId format', async () => {
    const testData = { search: returnRandomValue('This is my first tweet', 'Obiedere', 'This is my 1st reply to a tweet') };
    const token = generateToken(returnRandomValue(createVarChars(12), createVarChars(24)));
    const response = await chai.request(app).post('/api/v1/searches').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token does not match MongoDB ObjectId format');
  });
});
