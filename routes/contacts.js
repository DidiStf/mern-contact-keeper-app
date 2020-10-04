const express = require('express');
const { body, validationResult } = require('express-validator');

const authenticate = require('../middleware/auth');
const contactService = require('../services/contact');

const router = express.Router();

// @route GET api/contacts
// @desc Get all user's contacts
// @access Private
router.get('/', authenticate, async (req, res) => {
  try {
    const contacts = await contactService.findAllByUserId(req.user.id);
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route POST api/contacts
// @desc Add new contact
// @access Private
router.post(
  '/',
  [authenticate, [body('name', 'Name is required.').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const contactData = {
        name,
        email,
        phone,
        type,
        user: req.user.id,
      };

      const contact = await contactService.saveContact(contactData);

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

// @route PUT api/contacts/:id
// @desc Update contact
// @access Private
router.put('/:id', authenticate, async (req, res) => {
  const { name, email, phone, type } = req.body;
  const { id } = req.params;

  //Build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await contactService.findOneById(id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not authorized' });

    contact = await contactService.updateContact(id, contactFields);

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route DELETE api/contacts/:id
// @desc Delete contact
// @access Private
router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    let contact = await contactService.findOneById(id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Non authorized' });

    await contactService.deleteContact(id);

    res.json({ msg: 'Contact removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
