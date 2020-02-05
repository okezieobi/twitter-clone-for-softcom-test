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
  deleteData, users, tweetsAndReplies, generateToken, createVarChars, getRandomArrayIndex,
} = Test;
const { returnRandomValue } = new Test();

chai.use(chaiHttp);

describe('Test endpoint at "/api/v1/AndtweetsAndReplies" to get all tweets by user id as an authenticated user with GET', () => {
  before(async () => {
    await queryNone(deleteData());
  });

  before(async () => {
    await queryAny(users());
  });

  before(async () => {
    await queryAny(tweetsAndReplies());
  });

  after(async () => {
    await queryNone(deleteData());
  });

  it('Should get all tweets of user at "/api/v1/tweets" as an authenicated user with GET if all input fields are valid', async () => {
    const token = generateToken('5050505050505');
    const response = await chai.request(app).get('/api/v1/tweets').set('token', token);
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(200);
    expect(response.body).to.have.property('data').to.be.an('array');
    const { data } = response.body;
    const randomlySelectedData = getRandomArrayIndex(data);
    if (data.length > 0) {
      expect(response.body.data[randomlySelectedData]).to.have.property('id').to.be.a('number');
      expect(response.body.data[randomlySelectedData]).to.have.property('tweet').to.be.a('string');
      expect(response.body.data[randomlySelectedData]).to.have.property('createdOn').to.be.a('string');
    }
  });

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
    const token = generateToken('505050556565555');
    const response = await chai.request(app).get('/api/v1/tweets').set('token', token);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token provided does not match any user');
  });

  it('Should not get all tweets of user at "/api/v1/tweets" as an authenticated user with GET if token is not a positive integer', async () => {
    const token = generateToken(returnRandomValue('-5050505050505', '-505.0505050505'));
    const response = await chai.request(app).get('/api/v1/tweets').set('token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token must be a positive integer');
  });
});
