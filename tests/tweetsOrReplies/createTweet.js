/* eslint-disable no-underscore-dangle */
import {
  Test,
  expect,
  chai,
  chaiHttp,
  app,
  userSeeds,
  ObjectId,
} from '../index';

const {
  deleteData, seedUsers, generateToken, createVarChars, returnRandomValue,
} = Test;

chai.use(chaiHttp);

describe('Test endpoint at "/api/v1/tweets" to create a tweet as an authenticated User with POST', () => {
  before('Delete data before tests', async () => {
    await deleteData();
  });

  before('Seed user data before tests', async () => {
    await seedUsers();
  });

  after('Delete data after tests', async () => {
    await deleteData();
  });

  it('Should create a tweet at "/api/v1/tweets" as an authenticated user with POST if all input fields are valid', async () => {
    const testData = { tweet: 'First tweet' };
    const token = generateToken(userSeeds[0]._id);
    const response = await chai.request(app).post('/api/v1/tweets').set('token', token).send(testData);
    expect(response).to.have.status(201);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(201);
    expect(response.body).to.have.property('data').to.be.an('object');
    expect(response.body.data).to.have.property('id').to.be.a('string');
    expect(response.body.data).to.have.property('tweet').to.be.a('string').to.equal(testData.tweet);
    expect(response.body.data).to.have.property('createdOn').to.be.a('string');
  }).timeout(3000);

  it('Should not create a tweet at "/api/v1/tweets" as an authenticated user with POST if tweet is a falsy value', async () => {
    const testData = { tweet: returnRandomValue(undefined, null, '', NaN, 0) };
    const token = generateToken(userSeeds[0]._id);
    const response = await chai.request(app).post('/api/v1/tweets').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Tweet is required');
  });

  it('Should not create a tweet at "/api/v1/tweets" as an authenticated user with POST if tweet is not sent', async () => {
    const testData = {};
    const token = generateToken(userSeeds[0]._id);
    const response = await chai.request(app).post('/api/v1/tweets').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Tweet is required');
  });

  it('Should not create a tweet at "/api/v1/tweets" as an authenticated user with POST if tweet is a more than 280 characters', async () => {
    const testData = { tweet: createVarChars(500) };
    const token = generateToken(userSeeds[0]._id);
    const response = await chai.request(app).post('/api/v1/tweets').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Tweet must be less than 280 characters');
  });

  it('Should not create a tweet at "/api/v1/tweets" as an authenticated user with POST if token is an empty string', async () => {
    const testData = { tweet: 'First Tweet' };
    const token = '';
    const response = await chai.request(app).post('/api/v1/tweets').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not create a tweet at "/api/v1/tweets" as an authenticated user with POST if token is not sent', async () => {
    const testData = { tweet: 'First Tweet' };
    const response = await chai.request(app).post('/api/v1/tweets').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not create a tweet at "/api/v1/tweets" as an authenticated user with POST if token does not match JWT format', async () => {
    const testData = { tweet: 'First Tweet' };
    const token = createVarChars(300);
    const response = await chai.request(app).post('/api/v1/tweets').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token provided does not match JWT format');
  });

  it('Should not create a tweet at "/api/v1/tweets" as an authenticated user with POST if id from token does not match any user', async () => {
    const testData = { tweet: 'First Tweet' };
    const token = generateToken(new ObjectId());
    const response = await chai.request(app).post('/api/v1/tweets').set('token', token).send(testData);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token provided does not match any user');
  });

  it('Should not create a tweet at "/api/v1/tweets" as an authenticated user with POST if id from token is not a MongoDB ObjectId', async () => {
    const testData = { tweet: 'First Tweet' };
    const token = generateToken(returnRandomValue(createVarChars(12), createVarChars(24)));
    const response = await chai.request(app).post('/api/v1/tweets').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token does not match ObjectId format');
  });
});
