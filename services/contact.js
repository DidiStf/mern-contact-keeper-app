const Contact = require('../models/Contact');

exports.findAllByUserId = (id) =>
  Contact.find({ user: id }).sort({
    createdAt: -1,
  });

exports.findOneById = (id) => Contact.findById(id);

exports.saveContact = (contactData) => Contact.create(contactData);

exports.updateContact = (id, contactData) =>
  Contact.findByIdAndUpdate(id, { $set: contactData }, { new: true });

exports.deleteContact = (id) => Contact.findByIdAndRemove(id);
