const express = require('express');
const { body, validationResult } = require('express-validator');

const authenticate = require('../middleware/auth');
const contactService = require('../services/contact');

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const contacts = await contactService.findAllByUserId(req.user.id);
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post(
  '/',
  [
    authenticate,
    [
      body('name', 'Missing a valid required property name').not().isEmpty(),
      body('email', 'Missing a valid required property email').isEmail(),
    ],
  ],
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
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server Error' });
    }
  }
);

router.put(
  '/:id',
  [
    authenticate,
    [
      body('name', 'Missing a valid required property name').not().isEmpty(),
      body('email', 'Missing a valid required property email').isEmail(),
    ],
  ],
  async (req, res) => {
    const { name, email, phone, type } = req.body;
    const { id } = req.params;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Build contact object
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
      let contact = await contactService.findOneById(id);

      if (!contact)
        return res.status(404).json({ message: 'Contact not found' });

      // Make sure user owns contact
      if (contact.user.toString() !== req.user.id)
        return res.status(401).json({ message: 'Not authorized' });

      contact = await contactService.updateContact(id, contactFields);

      res.json(contact);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server Error' });
    }
  }
);

router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    let contact = await contactService.findOneById(id);

    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id)
      return res.status(401).json({ message: 'Non authorized' });

    await contactService.deleteContact(id);

    res.json({ message: 'Contact removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
