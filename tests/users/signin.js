import {
  Test,
  expect,
  chai,
  chaiHttp,
  app,
  pool,
} from '../index';

chai.use(chaiHttp);

describe('Test endpoints at "/api/v1/auth/signin" to sign in a User with POST', () => {
  const { queryNone, queryAny } = pool;
  const { deleteData, users } = Test;
  const { returnRandomValue, createEmailVarChar } = new Test();

  before(async () => {
    await queryNone(deleteData());
  });

  before(async () => {
    await queryAny(users());
  });

  after(async () => {
    await queryNone(deleteData());
  });

  it('Should signin in a User at "/api/v1/auth/signin" with POST if all request inputs are valid', async () => {
    const data = { username: 'Obiedere', email: 'foobar@mail.com' };
    const testData = {
      user: returnRandomValue(data.email, data.username),
      password: '456789Lovely',
    };
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(200);
    expect(response.body).to.have.property('data').to.be.an('object');
    expect(response.body.data).to.have.property('id').to.be.a('number');
    expect(response.body.data).to.have.property('fullName').to.be.a('string');
    expect(response.body.data).to.have.property('userName').to.be.a('string').to.equal(data.username);
    expect(response.body.data).to.have.property('email').to.be.a('string').to.equal(data.email);
    expect(response.body.data).to.have.property('type').to.be.a('string').to.equal('Client');
    expect(response.body).to.have.property('token').to.be.a('string');
    expect(response.header).to.have.property('token').to.be.a('string');
    expect(response.body.data).to.have.property('followings').to.be.a('number');
    expect(response.body.data).to.have.property('followers').to.be.a('number');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user email is undefined or null or an empty string', async () => {
    const data = { username: 'Obiedere', email: 'foobar@mail.com' };
    const testData = {
      user: returnRandomValue(data.email, data.username),
      password: 'AbcDFer123*@is!',
    };
    testData.user = returnRandomValue(undefined, '', null);
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email or username is required');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user email is undefined or null or an empty string', async () => {
    const data = { username: 'Obiedere', email: 'foobar@mail.com' };
    const testData = {
      user: returnRandomValue(data.email, data.username),
      password: 'AbcDFer123*@is!',
    };
    testData.user = createEmailVarChar(200, 10);
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email or username must be less than 128 characters');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user email does not exist', async () => {
    const data = { username: 'Obiedere', email: 'foobar@mail.com' };
    const testData = {
      user: returnRandomValue(data.email, data.username),
      password: 'AbcDFer123*@is!',
    };
    delete testData.user;
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email or username is required');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user email has not been registered', async () => {
    const data = { username: 'Obiedere', email: 'foobar@mail.com' };
    const testData = {
      user: returnRandomValue(data.email, data.username),
      password: 'AbcDFer123*@is!',
    };
    testData.user = 'haha@mail.com';
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('User does not exist, please sign up');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user password is undefined or null or an empty string', async () => {
    const data = { username: 'Obiedere', email: 'foobar@mail.com' };
    const testData = {
      user: returnRandomValue(data.email, data.username),
      password: 'AbcDFer123*@is!',
    };
    testData.password = returnRandomValue(undefined, '', null);
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user password does not exist', async () => {
    const data = { username: 'Obiedere', email: 'foobar@mail.com' };
    const testData = {
      user: returnRandomValue(data.email, data.username),
      password: 'AbcDFer123*@is!',
    };
    delete testData.password;
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user password is not a minimum of 8 characters', async () => {
    const data = { username: 'Obiedere', email: 'foobar@mail.com' };
    const testData = {
      user: returnRandomValue(data.email, data.username),
      password: 'AbcDFer123*@is!',
    };
    testData.password = 'hdh';
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, 128 characters maximum');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user password is not a max of 128 characters', async () => {
    const data = { username: 'Obiedere', email: 'foobar@mail.com' };
    const testData = {
      user: returnRandomValue(data.email, data.username),
      password: 'AbcDFer123*@is!',
    };
    testData.password = 'hdh';
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, 128 characters maximum');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user password does not not match with input password', async () => {
    const data = { username: 'Obiedere', email: 'foobar@mail.com' };
    const testData = {
      user: returnRandomValue(data.email, data.username),
      password: 'AbcDFer123*@is!',
    };
    testData.password = 'AbcDFer123*@is!90';
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password does not match user');
  });
});
