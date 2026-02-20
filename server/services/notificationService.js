const nodemailer = require('nodemailer');

function toBoolean(value) {
  return ['1', 'true', 'yes', 'on'].includes(String(value || '').toLowerCase());
}

function getEmailConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.NOTIFY_EMAIL_TO;

  if (!host || !user || !pass || !to) {
    return null;
  }

  const secure = process.env.SMTP_SECURE
    ? toBoolean(process.env.SMTP_SECURE)
    : port === 465;

  return {
    host,
    port,
    user,
    pass,
    to,
    from: process.env.SMTP_FROM || user,
    secure,
  };
}

function getWhatsAppConfig() {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const to = process.env.WHATSAPP_TO_NUMBER;

  if (!token || !phoneNumberId || !to) {
    return null;
  }

  return { token, phoneNumberId, to };
}

function buildPlainTextMessage(payload) {
  return [
    'New portfolio contact inquiry',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Message: ${payload.message}`,
  ].join('\n');
}

function buildHtmlMessage(payload) {
  return `
    <h3>New portfolio contact inquiry</h3>
    <p><strong>Name:</strong> ${payload.name}</p>
    <p><strong>Email:</strong> ${payload.email}</p>
    <p><strong>Message:</strong></p>
    <p>${payload.message.replace(/\n/g, '<br />')}</p>
  `;
}

async function sendEmailNotification(payload) {
  const config = getEmailConfig();
  if (!config) {
    return {
      sent: false,
      skipped: true,
      reason: 'Email is not configured.',
    };
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  await transporter.sendMail({
    from: config.from,
    to: config.to,
    replyTo: payload.email,
    subject: `New portfolio message from ${payload.name}`,
    text: buildPlainTextMessage(payload),
    html: buildHtmlMessage(payload),
  });

  return { sent: true };
}

async function sendWhatsAppNotification(payload) {
  const config = getWhatsAppConfig();
  if (!config) {
    return {
      sent: false,
      skipped: true,
      reason: 'WhatsApp is not configured.',
    };
  }

  const bodyText = buildPlainTextMessage(payload).slice(0, 4096);
  const response = await fetch(
    `https://graph.facebook.com/v18.0/${config.phoneNumberId}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: config.to,
        type: 'text',
        text: {
          body: bodyText,
        },
      }),
    }
  );

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const reason = data?.error?.message || 'WhatsApp API request failed.';
    throw new Error(reason);
  }

  return {
    sent: true,
    messageId: data?.messages?.[0]?.id || null,
  };
}

module.exports = {
  sendEmailNotification,
  sendWhatsAppNotification,
};
