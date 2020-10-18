const request = require('supertest');

const app = require('../../app');
const User = require('../../models/User');
const { setupDB } = require('../../utils/setupTestDB');

// Setup a test database
setupDB();

const newUser = {
  email: 'user@email.com',
  name: 'User',
  password: '123456',
};

describe('POST api/users', () => {
  it('Should save user to database with status 200 OK', async (done) => {
    request(app)
      .post('/api/users')
      .send(newUser)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('Should save user to database with status 200 and return token', async (done) => {
    request(app)
      .post('/api/users')
      .send(newUser)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return done(err);
        const result = JSON.parse(res.text);
        expect(result.token).toBeTruthy();
        done();
      });
  });

  it('Should return error 409 Conflict (User already exists)', async (done) => {
    await User.create(newUser);
    request(app)
      .post('/api/users')
      .send(newUser)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(409, { message: 'User already exists' }, done);
  });

  it('Should return error 400 Bad Request because of empty field email', async (done) => {
    const { email, ...user } = newUser;
    user.email = '';
    request(app)
      .post('/api/users')
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
    const { email, ...user } = newUser;
    request(app)
      .post('/api/users')
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

  it('Should return error 400 Bad Request because of empty field name', async (done) => {
    const { name, ...user } = newUser;
    user.name = '';
    request(app)
      .post('/api/users')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        400,
        {
          errors: [
            {
              value: '',
              msg: 'Missing a valid required property name',
              param: 'name',
              location: 'body',
            },
          ],
        },
        done
      );
  });

  it('Should return error 400 Bad Request because of missing field name', async (done) => {
    const { name, ...user } = newUser;
    request(app)
      .post('/api/users')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        400,
        {
          errors: [
            {
              msg: 'Missing a valid required property name',
              param: 'name',
              location: 'body',
            },
          ],
        },
        done
      );
  });

  it('Should return error 400 Bad Request because of empty field password', async (done) => {
    const { password, ...user } = newUser;
    user.password = '';
    request(app)
      .post('/api/users')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        400,
        {
          errors: [
            {
              value: '',
              msg:
                'Missing a valid required property password of 6 or more characters',
              param: 'password',
              location: 'body',
            },
          ],
        },
        done
      );
  });

  it('Should return error 400 Bad Request because of missing field password', async (done) => {
    const { password, ...user } = newUser;
    request(app)
      .post('/api/users')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        400,
        {
          errors: [
            {
              msg:
                'Missing a valid required property password of 6 or more characters',
              param: 'password',
              location: 'body',
            },
          ],
        },
        done
      );
  });

  it('Should save user to database and asure that the user has id, name, email and password', async (done) => {
    request(app)
      .post('/api/users')
      .send(newUser)
      .set('Accept', 'application/json')
      .end(async (err, res) => {
        if (err) return done(err);
        const user = await User.findOne({ email: 'user@email.com' });
        expect(user).toHaveProperty('_id');
        expect(user).toHaveProperty('name');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('password');
        done();
      });
  });

  it('Should save user to database and return name: User and email: user@email.com', async (done) => {
    request(app)
      .post('/api/users')
      .send(newUser)
      .set('Accept', 'application/json')
      .end(async (err, res) => {
        if (err) return done(err);
        const user = await User.findOne({ email: 'user@email.com' });
        expect(user.name).toBe('User');
        expect(user.email).toBe('user@email.com');
        done();
      });
  });
});
