import {
  Test,
  expect,
  chai,
  chaiHttp,
  app,
  pool,
} from '../index';

const { queryNone } = pool;
const { deleteData, createVarChars } = Test;
const { returnRandomValue, createEmailVarChar } = new Test();

chai.use(chaiHttp);

describe('Test endpoint at "/api/v1/auth/signup" to create a User with POST', () => {
  before(async () => {
    await queryNone(deleteData());
  });

  after(async () => {
    await queryNone(deleteData());
  });

  it('Should create a User at "/api/v1/auth/signup" with POST if all request inputs are valid', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(201);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(201);
    expect(response.body).to.have.property('data').to.be.an('object');
    expect(response.body.data).to.have.property('id').to.be.a('number');
    expect(response.body.data).to.have.property('fullName').to.be.a('string').to.equal(testData.fullName);
    expect(response.body.data).to.have.property('username').to.be.a('string').to.equal(testData.username);
    expect(response.body.data).to.have.property('email').to.be.a('string').to.equal(testData.email);
    expect(response.body.data).to.have.property('type').to.be.a('string').to.equal('Client');
    expect(response.body.data).to.have.property('createdOn').to.be.a('string');
    expect(response.body).to.have.property('token').to.be.a('string');
    expect(response.header).to.have.property('token').to.be.a('string');
    expect(response.body.data).to.have.property('followings').to.be.a('number').to.equal(0);
    expect(response.body.data).to.have.property('followers').to.be.a('number').to.equal(0);
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if username is undefined or an empty string or null', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.username = returnRandomValue(undefined, '', null);
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Username is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if username is not sent', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    delete testData.username;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Username is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if username is not string data type', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.username = 1000;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Username must be string data type');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if username is more than 128 characters', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.username = createVarChars(200);
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Username must be less than 128 characters');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user full name is undefined or an empty string or null', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.fullName = returnRandomValue(undefined, '', null);
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Full name is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user full name does not exist', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    delete testData.fullName;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Full name is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user full name is not string data type', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.fullName = 2000;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Full name must be string data type');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user full name is more than 128 chars', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.fullName = createVarChars(200);
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Full name must be less than 128 characters');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user email is undefined or an empty string or null', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.email = returnRandomValue(undefined, '', null);
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user email does not exist', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    delete testData.email;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user email is string data type', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.email = 3000;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email must be string data type');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user email format is wrong', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.email = 'haha@com';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email format is wrong OR is more than 128 characters');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user email is more than 128 chars', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.email = createEmailVarChar(200, 8);
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email format is wrong OR is more than 128 characters');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user email has already been registered', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.email = 'mama@mail.com';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('User exists, please sign in with email or username');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user password is undefined or null or an empty string', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.password = returnRandomValue(undefined, '', null);
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user password does not exist', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    delete testData.password;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user password is not string data type', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.password = 2000;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be string data type');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user password is not 128 characters maximum', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.password = createVarChars(200);
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, 128 characters maximum');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user password is not a minimum of 8 characters', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.password = 'fff';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, 128 characters maximum');
  });
});
