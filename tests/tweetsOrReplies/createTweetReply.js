import {
  Test,
  expect,
  chai,
  chaiHttp,
  app,
  pool,
} from '../index';

const { queryNone, queryAny } = pool;
const {
  deleteData, users, generateToken, createVarChars, tweetsOrReplies,
} = Test;
const { returnRandomValue } = new Test();

chai.use(chaiHttp);

describe('Test endpoint at "/api/v1/tweets/:id" to create a tweet reply as an authenticated User with POST', () => {
  before(async () => {
    await queryNone(deleteData());
  });

  before(async () => {
    await queryAny(users());
  });

  before(async () => {
    await queryAny(tweetsOrReplies());
  });

  after(async () => {
    await queryNone(deleteData());
  });

  it('Should create a tweet reply at "/api/v1/tweets/:id" as an authenticated user with POST if all input fields are valid', async () => {
    const testData = { reply: 'First tweet reply' };
    const token = generateToken('1010101010101');
    const tweetId = '3030303030303';
    const response = await chai.request(app).post(`/api/v1/tweets/${tweetId}`).set('token', token).send(testData);
    expect(response).to.have.status(201);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(201);
    expect(response.body).to.have.property('data').to.be.an('object');
    expect(response.body.data).to.have.property('id').to.be.a('number');
    expect(response.body.data).to.have.property('reply').to.be.a('string').to.equal(testData.reply);
    expect(response.body.data).to.have.property('createdOn').to.be.a('string');
    expect(response.body.data).to.have.property('tweetId').to.be.a('number').to.equal(parseInt(tweetId, 10));
  });

  it('Should not create a tweet reply at "/api/v1/tweets/:id" as an authenticated user with POST if tweet reply is a undefined or null or an empty string', async () => {
    const testData = { reply: returnRandomValue(undefined, null, '') };
    const token = generateToken('1010101010101');
    const tweetId = '3030303030303';
    const response = await chai.request(app).post(`/api/v1/tweets/${tweetId}`).set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Reply is required');
  });

  it('Should not create a tweet reply at "/api/v1/tweets/:id" as an authenticated user with POST if tweet reply is not sent', async () => {
    const testData = {};
    const token = generateToken('1010101010101');
    const tweetId = '3030303030303';
    const response = await chai.request(app).post(`/api/v1/tweets/${tweetId}`).set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Reply is required');
  });

  it('Should not create a tweet reply at "/api/v1/tweets/:id" as an authenticated user with POST if tweet reply is a more than 280 characters', async () => {
    const testData = { reply: createVarChars(500) };
    const token = generateToken('1010101010101');
    const tweetId = '3030303030303';
    const response = await chai.request(app).post(`/api/v1/tweets/${tweetId}`).set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Reply must be less than 280 characters');
  });

  it('Should not create a tweet reply at "/api/v1/tweets/:id" as an authenticated user with POST if token is an empty string', async () => {
    const testData = { reply: 'First Tweet reply' };
    const token = '';
    const tweetId = '3030303030303';
    const response = await chai.request(app).post(`/api/v1/tweets/${tweetId}`).set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not create a tweet reply at "/api/v1/tweets/:id" as an authenticated user with POST if token is not sent', async () => {
    const testData = { reply: 'First Tweet' };
    const tweetId = '3030303030303';
    const response = await chai.request(app).post(`/api/v1/tweets/${tweetId}`).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not create a tweet reply at "/api/v1/tweets/:id" as an authenticated user with POST if token does not match JWT format', async () => {
    const testData = { reply: 'First Tweet' };
    const token = createVarChars(300);
    const tweetId = '3030303030303';
    const response = await chai.request(app).post(`/api/v1/tweets/${tweetId}`).set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token provided does not match JWT format');
  });

  it('Should not create a tweet reply at "/api/v1/tweets/:id" as an authenticated user with POST if id from token does not match any user', async () => {
    const testData = { reply: 'First Tweet' };
    const token = generateToken('505050556565555');
    const tweetId = '3030303030303';
    const response = await chai.request(app).post(`/api/v1/tweets/${tweetId}`).set('token', token).send(testData);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token provided does not match any user');
  });

  it('Should not create a tweet reply at "/api/v1/tweets/:id" as an authenticated user with POST if token is not a positive integer', async () => {
    const testData = { reply: 'First Tweet' };
    const token = generateToken(returnRandomValue('-5050505050505', '-505.0505050505'));
    const tweetId = '3030303030303';
    const response = await chai.request(app).post(`/api/v1/tweets/${tweetId}`).set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token must be a positive integer');
  });

  it('Should not create a tweet reply at "/api/v1/tweets/:id" as an authenticated user with POST if tweet id is not positive integer', async () => {
    const testData = { reply: '2ND TWEET' };
    const token = generateToken('1010101010101');
    const tweetId = returnRandomValue('303030.3030303', '-3030303030303', '-30303030.30303', 'ddjdjjdkdkdkdf');
    const response = await chai.request(app).post(`/api/v1/tweets/${tweetId}`).set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Tweet id must be a positive integer');
  });
});
