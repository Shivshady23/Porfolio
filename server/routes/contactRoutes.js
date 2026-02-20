const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();

function validatePayload(payload) {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!payload.name || payload.name.trim().length < 2) {
    errors.name = 'Name must contain at least 2 characters.';
  }
  if (!payload.email || !emailRegex.test(payload.email.trim())) {
    errors.email = 'Email is not valid.';
  }
  if (!payload.message || payload.message.trim().length < 10) {
    errors.message = 'Message must contain at least 10 characters.';
  }

  return errors;
}

router.post('/contact', async (req, res, next) => {
  try {
    const { name = '', email = '', message = '' } = req.body;
    const errors = validatePayload({ name, email, message });

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed.',
        errors,
      });
    }

    const newContact = await Contact.create({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    return res.status(201).json({
      success: true,
      message: 'Message saved successfully.',
      id: newContact._id,
      createdAt: newContact.createdAt,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
