const request = require('supertest');

const app = require('../../app');
const { setupDB } = require('../../utils/setupTestDB');

// Setup a test database
setupDB();

const newContact = {
  name: 'contact',
  email: 'contact@email.com',
  phone: '000-000-0000',
  type: 'professional',
};

const updatedContact = {
  name: 'updatedContact',
  email: 'updatedcontact@email.com',
  phone: '888-888-8888',
  type: 'personal',
};

const credentials = {
  email: 'testuser3@email.com',
  password: '12345678',
};

let testToken = '';

beforeEach((done) => {
  request(app)
    .post('/api/auth')
    .send(credentials)
    .end((err, res) => {
      if (err) return done(err);
      const result = JSON.parse(res.text);
      testToken = result.token;
      done();
    });
});

describe('GET api/contacts', () => {
  it("Should return user's contacts with status 200 OK", async (done) => {
    request(app)
      .get('/api/contacts')
      .set('x-auth-token', testToken)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it("Should return an array of all 3 user's contacts", async (done) => {
    request(app)
      .get('/api/contacts')
      .set('x-auth-token', testToken)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const result = JSON.parse(res.text);
        expect(result.length).toBe(3);
        done();
      });
  });
});

describe('POST api/contacts', () => {
  it('Should save contact to database with status 200 OK', async (done) => {
    request(app)
      .post('/api/contacts')
      .send(newContact)
      .set('x-auth-token', testToken)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('Should save contact to database and asure that the contact has id, name, email, phone and type', async (done) => {
    request(app)
      .post('/api/contacts')
      .send(newContact)
      .set('x-auth-token', testToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return done(err);
        const result = JSON.parse(res.text);
        expect(result).toHaveProperty('_id');
        expect(result).toHaveProperty('name');
        expect(result).toHaveProperty('email');
        expect(result).toHaveProperty('phone');
        expect(result).toHaveProperty('type');
        expect(result).toHaveProperty('user');
        done();
      });
  });

  it('Should save contact to database and asure that the contact has an id, an user and name: contact, email: contact@email.com, phone: 000-000-0000 and type: professional', async (done) => {
    request(app)
      .post('/api/contacts')
      .send(newContact)
      .set('x-auth-token', testToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return done(err);
        const result = JSON.parse(res.text);
        expect(result._id).toBeDefined();
        expect(result.user).toBeDefined();
        expect(result.name).toBe(newContact.name);
        expect(result.email).toBe(newContact.email);
        expect(result.phone).toBe(newContact.phone);
        expect(result.type).toBe(newContact.type);
        done();
      });
  });

  it('Should return error 400 Bad Request because of empty field name (from create)', async (done) => {
    const { name, ...contact } = newContact;
    contact.name = '';
    request(app)
      .post('/api/contacts')
      .send(contact)
      .set('x-auth-token', testToken)
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

  it('Should return error 400 Bad Request because of missing field name (from create)', async (done) => {
    const { name, ...contact } = newContact;
    request(app)
      .post('/api/contacts')
      .send(contact)
      .set('x-auth-token', testToken)
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
});

describe('PUT api/contacts/:id', () => {
  let contact = {};

  beforeEach((done) => {
    request(app)
      .post('/api/contacts')
      .send(newContact)
      .set('x-auth-token', testToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return done(err);
        contact = JSON.parse(res.text);
        done();
      });
  });

  it('Should update contact with status 200 OK', async (done) => {
    request(app)
      .put(`/api/contacts/${contact._id}`)
      .send(updatedContact)
      .set('x-auth-token', testToken)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('Should update contact and return updated contact with name: updatedContact, email: updatedcontact@email.com, phone: 888-888-8888 and type: personal', async (done) => {
    request(app)
      .put(`/api/contacts/${contact._id}`)
      .send(updatedContact)
      .set('x-auth-token', testToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return done(err);
        const result = JSON.parse(res.text);
        expect(result.name).toBe(updatedContact.name);
        expect(result.email).toBe(updatedContact.email);
        expect(result.phone).toBe(updatedContact.phone);
        expect(result.type).toBe(updatedContact.type);
        expect(result.user).toEqual(contact.user);
        done();
      });
  });

  it('Should return error 400 Bad Request because of empty field name (from update)', async (done) => {
    const { name, ...contact } = newContact;
    contact.name = '';
    request(app)
      .put(`/api/contacts/${contact._id}`)
      .send(contact)
      .set('x-auth-token', testToken)
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

  it('Should return error 400 Bad Request because of missing field name (from update)', async (done) => {
    const { name, ...contact } = newContact;
    request(app)
      .put(`/api/contacts/${contact._id}`)
      .send(contact)
      .set('x-auth-token', testToken)
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

  it('Should return error 404 Not Found (Contact not found) from update', async (done) => {
    request(app)
      .put('/api/contacts/unexistingId')
      .send(updatedContact)
      .set('x-auth-token', testToken)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, { message: 'Contact not found' }, done);
  });
});

describe('DELETE api/contacts/:id', () => {
  let contact = {};

  beforeEach((done) => {
    request(app)
      .post('/api/contacts')
      .send(newContact)
      .set('x-auth-token', testToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return done(err);
        contact = JSON.parse(res.text);
        done();
      });
  });

  it('Should delete contact with status 200 OK', async (done) => {
    request(app)
      .delete(`/api/contacts/${contact._id}`)
      .send(updatedContact)
      .set('x-auth-token', testToken)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('Should delete contact and return message: Contact removed', async (done) => {
    request(app)
      .delete(`/api/contacts/${contact._id}`)
      .send(updatedContact)
      .set('x-auth-token', testToken)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, { message: 'Contact removed' }, done);
  });

  it('Should return error 404 Not Found (Contact not found) from delete', async (done) => {
    request(app)
      .delete('/api/contacts/unexistingId')
      .send(updatedContact)
      .set('x-auth-token', testToken)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, { message: 'Contact not found' }, done);
  });
});
