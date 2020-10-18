const { connectDB } = require('../../config/db');
const Contact = require('../../models/Contact');
const User = require('../../models/User');
const contactService = require('../../services/contact');
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

describe('Contact Service Test', () => {
  it('Create and save contact successfully', async () => {
    const user = await User.findOne({ email: testUser.email });
    const contact = { user: user._id, ...contactData };
    const savedContact = await contactService.saveContact(contact);
    expect(savedContact._id).toBeDefined();
    expect(savedContact.email).toBe(contact.email);
    expect(savedContact.name).toBe(contact.name);
    expect(savedContact.phone).toBe(contact.phone);
    expect(savedContact.type).toBe(contact.type);
    expect(savedContact.user).toEqual(contact.user);
  });

  it('Update contact successfully and returns updated contact', async () => {
    const user = await User.findOne({ email: testUser.email });
    const contact = await Contact.findOne({ user: user._id });
    const { name, email, phone, type } = contactData;
    const contactUpdate = {
      name,
      email,
      phone,
      type,
      _id: contact._id,
      user: contact.user,
    };
    const updatedContact = await contactService.updateContact(
      contactUpdate._id,
      contactUpdate
    );
    expect(updatedContact._id).toEqual(contact._id);
    expect(updatedContact.email).toBe(contactData.email);
    expect(updatedContact.name).toBe(contactData.name);
    expect(updatedContact.phone).toBe(contactData.phone);
    expect(updatedContact.type).toBe(contactData.type);
    expect(updatedContact.user).toEqual(contact.user);
  });

  it('Delete contact successfully', async () => {
    const user = await User.findOne({ email: testUser.email });
    const contact = await Contact.findOne({ user: user._id });
    await contactService.deleteContact(contact._id);
    const deletedContact = await Contact.findById(contact._id);
    expect(deletedContact).toBeFalsy();
  });

  it('Find saved contact by id', async () => {
    const user = await User.findOne({ email: testUser.email });
    const contact = { user: user._id, ...contactData };
    const savedContact = await Contact.create(contact);
    const contactResult = await contactService.findOneById(savedContact._id);
    expect(contactResult._id).toBeDefined();
    expect(contactResult.email).toBe(contact.email);
    expect(contactResult.name).toBe(contact.name);
    expect(contactResult.phone).toBe(contact.phone);
    expect(contactResult.type).toBe(contact.type);
    expect(contactResult.user).toEqual(contact.user);
  });

  it('Find all saved contacts by user id and return an array of length of 3', async () => {
    const user = await User.findOne({ email: testUser.email });
    const contacts = await contactService.findAllByUserId(user._id);
    expect(Array.isArray([contacts])).toBe(true);
    expect(contacts.length).toBe(3);
  });
});
