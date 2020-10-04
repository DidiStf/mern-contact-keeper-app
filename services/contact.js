const Contact = require('../models/Contact');

exports.findAllByUserId = (id) =>
  Contact.find({ user: id }).sort({
    date: -1,
  });

exports.findOneById = (id) => Contact.findById(id);

exports.saveContact = async (contactData) => {
  const newContact = new Contact(contactData);
  const contact = await newContact.save();
  return contact;
};

exports.updateContact = (id, contactData) =>
  Contact.findByIdAndUpdate(id, { $set: contactData }, { new: true });

exports.deleteContact = (id) => Contact.findByIdAndRemove(id);
