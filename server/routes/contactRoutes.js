const express = require('express');
const Contact = require('../models/Contact');
const {
  sendEmailNotification,
  sendWhatsAppNotification,
} = require('../services/notificationService');

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

    const sanitizedPayload = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    };

    const newContact = await Contact.create(sanitizedPayload);

    const [emailResult, whatsappResult] = await Promise.allSettled([
      sendEmailNotification(sanitizedPayload),
      sendWhatsAppNotification(sanitizedPayload),
    ]);

    const notifications = {
      email:
        emailResult.status === 'fulfilled'
          ? emailResult.value
          : { sent: false, skipped: false, reason: emailResult.reason?.message || 'Email failed.' },
      whatsapp:
        whatsappResult.status === 'fulfilled'
          ? whatsappResult.value
          : {
              sent: false,
              skipped: false,
              reason: whatsappResult.reason?.message || 'WhatsApp failed.',
            },
    };

    const hasSuccessfulDelivery = Object.values(notifications).some((item) => item.sent);
    if (!hasSuccessfulDelivery) {
      return res.status(502).json({
        success: false,
        message: 'Message saved, but delivery failed. Configure email or WhatsApp settings.',
        id: newContact._id,
        createdAt: newContact.createdAt,
        notifications,
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Message sent successfully.',
      id: newContact._id,
      createdAt: newContact.createdAt,
      notifications,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
