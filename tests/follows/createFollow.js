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
  deleteData, users, generateToken, createVarChars,
} = Test;
const { returnRandomValue } = new Test();

chai.use(chaiHttp);

describe('Test endpoint at "/api/v1/follows" to follow another registered user as an authenticated user with POST', () => {
  before(async () => {
    await queryNone(deleteData());
  });

  before(async () => {
    await queryAny(users());
  });

  after(async () => {
    await queryNone(deleteData());
  });

  it('Should follow another registered user at "/api/v1/follows" as an authenticated user with POST if all inputs are valid', async () => {
    const testData = { user: 'Ekemezie' };
    const token = generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/follows').set('token', token).send(testData);
    expect(response).to.have.status(201);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(201);
    expect(response.body).to.have.property('message').to.be.an('string').to.equal(`${testData.user} successfully followed`);
  });

  it('Should not follow another registered user at "/api/v1/follows" as an authenticated user with POST if user data is a falsy value', async () => {
    const testData = { user: returnRandomValue(undefined, null, '') };
    const token = generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/follows').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.an('string').to.equal('Email or username is required');
  });

  it('Should not follow another registered user at "/api/v1/follows" as an authenticated user with POST if user data is not sent', async () => {
    const testData = {};
    const token = generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/follows').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.an('string').to.equal('Email or username is required');
  });

  it('Should not follow another registered user at "/api/v1/follows" as an authenticated user with POST if user data is not string data type', async () => {
    const testData = { user: 3000 };
    const token = generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/follows').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.an('string').to.equal('Email or username must be string data type');
  });

  it('Should not follow another registered user at "/api/v1/follows" as an authenticated user with POST if user data is more than 128 characters', async () => {
    const testData = { user: createVarChars(200) };
    const token = generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/follows').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.an('string').to.equal('Email or username must be less than 128 characters');
  });

  it('Should not follow another registered user at "/api/v1/follows" as an authenticated user with POST if user data is not found', async () => {
    const testData = { user: 'ahahazizizi' };
    const token = generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/follows').set('token', token).send(testData);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.an('string').to.equal('User does not exist, user should please sign up');
  });

  it('Should not follow another registered user at "/api/v1/follows" as an authenticated user with POST if user data is same as authenticated user', async () => {
    const testData = { user: 'Obiedere' };
    const token = generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/follows').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.an('string').to.equal(`${testData.user} can not follow self`);
  });

  it('Should not follow another registered user at "/api/v1/follows" as an authenticated user with POST if user data is already being followed ', async () => {
    const testData = { user: 'Ekemezie' };
    const token = generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/follows').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.an('string').to.equal('Follow already exists');
  });

  it('Should not follow another registered user at "/api/v1/follows" as an authenticated user with POST if token is an empty string', async () => {
    const testData = { user: 'Ekemezie' };
    const token = '';
    const response = await chai.request(app).post('/api/v1/follows').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.an('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not follow another registered user at "/api/v1/follows" as an authenticated user with POST if token is an not sent', async () => {
    const testData = { user: 'Ekemezie' };
    const response = await chai.request(app).post('/api/v1/follows').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.an('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not follow another registered user at "/api/v1/follows" as an authenticated user with POST if token does not match JWT format', async () => {
    const testData = { user: 'Ekemezie' };
    const token = createVarChars(300);
    const response = await chai.request(app).post('/api/v1/follows').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.an('string').to.equal('Token provided does not match JWT format');
  });

  it('Should not follow another registered user at "/api/v1/follows" as an authenticated user with POST if token does not match any user', async () => {
    const testData = { user: 'Ekemezie' };
    const token = generateToken('505050556565555');
    const response = await chai.request(app).post('/api/v1/follows').set('token', token).send(testData);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.an('string').to.equal('Token provided does not match any user');
  });

  it('Should not follow another registered user at "/api/v1/follows" as an authenticated user with POST if id from token is not a positive integer', async () => {
    const testData = { user: 'Ekemezie' };
    const token = generateToken(returnRandomValue('-5050505050505', '-505.0505050505'));
    const response = await chai.request(app).post('/api/v1/follows').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.an('string').to.equal('Id from token must be a positive integer');
  });
});
