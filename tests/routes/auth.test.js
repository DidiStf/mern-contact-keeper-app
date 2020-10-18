const config = require('config');
const jwt = require('jsonwebtoken');
const request = require('supertest');

const app = require('../../app');
const User = require('../../models/User');
const { setupDB } = require('../../utils/setupTestDB');

// Setup a test database
setupDB();

const testUser = {
  email: 'testuser1@email.com',
  name: 'TestUser1',
  password: '123456',
};

describe('GET api/auth', () => {
  let testToken = '';

  beforeEach((done) => {
    request(app)
      .post('/api/auth')
      .send(testUser)
      .end((err, res) => {
        const result = JSON.parse(res.text);
        testToken = result.token;
        done();
      });
  });

  it('Should return user with status 200 OK', async (done) => {
    request(app)
      .get('/api/auth')
      .set('x-auth-token', testToken)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('Should return user with id, email and name based on authentication token', async (done) => {
    request(app)
      .get('/api/auth')
      .set('x-auth-token', testToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return done(err);
        const result = JSON.parse(res.text);
        expect(result.user).toHaveProperty('_id');
        expect(result.user).toHaveProperty('name');
        expect(result.user).toHaveProperty('email');
        done();
      });
  });

  it('Should return error 401 Unauthorized (Token is not valid)', async (done) => {
    const invalidToken = 'invalidToken';
    request(app)
      .get('/api/auth')
      .set('x-auth-token', invalidToken)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, { message: 'Token is not valid' }, done);
  });

  it('Should return error 401 Unauthorized (No token, authorisation denied)', async (done) => {
    request(app)
      .get('/api/auth')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, { message: 'No token, authorisation denied' }, done);
  });

  it('Should return user with email: testuser1@email.com and name: TestUser1 based on authentication token', async (done) => {
    request(app)
      .get('/api/auth')
      .set('x-auth-token', testToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return done(err);
        const result = JSON.parse(res.text);
        expect(result.user.name).toBe(testUser.name);
        expect(result.user.email).toBe(testUser.email);
        done();
      });
  });
});

describe('POST api/auth', () => {
  it('Should login user with status 200 OK', async (done) => {
    request(app)
      .post('/api/auth')
      .send(testUser)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('Should login user to database and return token', async (done) => {
    request(app)
      .post('/api/auth')
      .send(testUser)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return done(err);
        const result = JSON.parse(res.text);
        expect(result.token).toBeDefined();
        done();
      });
  });

  it('Should return error 400 Bad Request because of empty field password', async (done) => {
    const { password, ...user } = testUser;
    user.password = '';
    request(app)
      .post('/api/auth')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        400,
        {
          errors: [
            {
              value: '',
              msg: 'Missing a valid required property password',
              param: 'password',
              location: 'body',
            },
          ],
        },
        done
      );
  });

  it('Should return error 400 Bad Request because of missing field password', async (done) => {
    const { password, ...user } = testUser;
    request(app)
      .post('/api/auth')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        400,
        {
          errors: [
            {
              msg: 'Missing a valid required property password',
              param: 'password',
              location: 'body',
            },
          ],
        },
        done
      );
  });

  it('Should return error 400 Bad Request because of empty field email', async (done) => {
    const { email, ...user } = testUser;
    user.email = '';
    request(app)
      .post('/api/auth')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        400,
        {
          errors: [
            {
              value: '',
              msg: 'Missing a valid required property email',
              param: 'email',
              location: 'body',
            },
          ],
        },
        done
      );
  });

  it('Should return error 400 Bad Request because of missing field email', async (done) => {
    const { email, ...user } = testUser;
    request(app)
      .post('/api/auth')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        400,
        {
          errors: [
            {
              msg: 'Missing a valid required property email',
              param: 'email',
              location: 'body',
            },
          ],
        },
        done
      );
  });

  it('Should return error 400 Bad Request (Invalid credentials) because of wrong password', async (done) => {
    const { password, ...user } = testUser;
    user.password = '1234567';
    request(app)
      .post('/api/auth')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, { message: 'Invalid credentials' }, done);
  });

  it('Should return error 400 Bad Request (Invalid credentials) because of unregistered email', async (done) => {
    const { email, ...user } = testUser;
    user.email = 'testuser4@email.com';
    request(app)
      .post('/api/auth')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, { message: 'Invalid credentials' }, done);
  });
});
