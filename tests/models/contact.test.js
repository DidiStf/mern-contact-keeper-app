const mongoose = require('mongoose');

const { connectDB } = require('../../config/db');
const Contact = require('../../models/Contact');
const User = require('../../models/User');
const { setupDB } = require('../../utils/setupTestDB');

// Setup a test database
beforeAll(async () => await connectDB());
setupDB();

const testUser = {
  email: 'testuser1@email.com',
  name: 'TestUser1',
  password: '123456',
};

const contactData = {
  name: 'newContact',
  email: 'newcontact@email.com',
  phone: '777-777-7777',
  type: 'professional',
};

describe('Contact Model Test', () => {
  it('Create and save contact successfully', async () => {
    const user = await User.findOne({ email: testUser.email });
    const contact = { user: user._id, ...contactData };
    const savedContact = await Contact.create(contact);
    expect(savedContact._id).toBeDefined();
    expect(savedContact.email).toBe(contact.email);
    expect(savedContact.name).toBe(contact.name);
    expect(savedContact.phone).toBe(contact.phone);
    expect(savedContact.type).toBe(contact.type);
    expect(savedContact.user).toEqual(contact.user);
  });

  it('Asure that we are not able to add in any field that is not defined in the contact schema', async () => {
    const user = await User.findOne({ email: testUser.email });
    const contactWithInvalidField = {
      dateOfBirth: 'inavlidField',
      user: user._id,
      ...contactData,
    };
    const savedContactWithInvalidField = await Contact.create(
      contactWithInvalidField
    );
    expect(savedContactWithInvalidField._id).toBeDefined();
    expect(savedContactWithInvalidField.dateOfBirth).toBeUndefined();
  });

  it('Asure that we are not able to create a contact without required field email', async () => {
    const user = await User.findOne({ email: testUser.email });
    const contact = { user: user._id, ...contactData };
    const { email, ...c } = contact;
    let error = null;
    try {
      const savedContactWithMissingField = await Contact.create(c);
      error = savedContactWithMissingField;
    } catch (err) {
      error = err;
    }
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.email).toBeDefined();
  });

  it('Asure that we are not able to create a contact without required field name', async () => {
    const user = await User.findOne({ email: testUser.email });
    const contact = { user: user._id, ...contactData };
    const { name, ...c } = contact;
    let error = null;
    try {
      const savedContactWithMissingField = await Contact.create(c);
      error = savedContactWithMissingField;
    } catch (err) {
      error = err;
    }
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.name).toBeDefined();
  });

  it('Asure that we are not able to create a contact without required field user', async () => {
    let error = null;
    try {
      const savedContactWithMissingField = await Contact.create(contactData);
      error = savedContactWithMissingField;
    } catch (err) {
      error = err;
    }
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.user).toBeDefined();
  });
});
