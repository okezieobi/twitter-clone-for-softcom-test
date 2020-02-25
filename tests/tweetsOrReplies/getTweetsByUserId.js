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
  deleteData, seedUsers, seedTweets,
  generateToken, createVarChars, getRandomArrayIndex, returnRandomValue,
} = Test;

chai.use(chaiHttp);

describe('Test endpoint at "/api/v1/tweets" to get all tweets by user id as an authenticated user with GET', () => {
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

  it('Should get all tweets of user at "/api/v1/tweets" as an authenticated user with GET if all input fields are valid', async () => {
    const token = generateToken(userSeeds[0]._id);
    const response = await chai.request(app).get('/api/v1/tweets').set('token', token);
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(200);
    expect(response.body).to.have.property('data').to.be.an('array');
    const { data } = response.body;
    const randomIndex = getRandomArrayIndex(data);
    if (data.length > 0) {
      expect(response.body.data[randomIndex]).to.have.property('id').to.be.a('string');
      expect(response.body.data[randomIndex]).to.have.property('tweet').to.be.a('string');
      expect(response.body.data[randomIndex]).to.have.property('createdOn').to.be.a('string');
    }
  }).timeout(3000);

  it('Should not get all tweets of user at "/api/v1/tweets" as an authenticated user with GET if token is an empty string', async () => {
    const token = '';
    const response = await chai.request(app).get('/api/v1/tweets').set('token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not get all tweets of user at "/api/v1/tweets" as an authenticated user with GET if token is not sent', async () => {
    const response = await chai.request(app).get('/api/v1/tweets');
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not get all tweets of user at "/api/v1/tweets" as an authenticated user with GET if token does not match JWT format', async () => {
    const token = createVarChars(300);
    const response = await chai.request(app).get('/api/v1/tweets').set('token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token provided does not match JWT format');
  });

  it('Should not get all tweets of user at "/api/v1/tweets" as an authenticated user with GET if id from token does not match any user', async () => {
    const token = generateToken(new ObjectId());
    const response = await chai.request(app).get('/api/v1/tweets').set('token', token);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token provided does not match any user');
  });

  it('Should not get all tweets of user at "/api/v1/tweets" as an authenticated user with GET if id from token does not match MongoDB ObjectId format', async () => {
    const token = generateToken(returnRandomValue(createVarChars(12), createVarChars(24)));
    const response = await chai.request(app).get('/api/v1/tweets').set('token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token does not match MongoDB ObjectId format');
  });
});
