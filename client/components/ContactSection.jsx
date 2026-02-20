import { useMemo, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import SuccessToast from './SuccessToast';
import { submitContactForm } from '../services/api';
import { contactInfo } from '../data/content';

const initialState = {
  name: '',
  email: '',
  message: '',
};

function validateForm(values) {
  const errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = 'Enter at least 2 characters.';
  }
  if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }
  if (!values.message.trim() || values.message.trim().length < 10) {
    errors.message = 'Message should be at least 10 characters.';
  }

  return errors;
}

function ContactSection() {
  const [form, setForm] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const hasErrors = useMemo(() => Object.values(formErrors).some(Boolean), [formErrors]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
    setSubmitError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm(form);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError('');
      setSuccessMessage('');
      await submitContactForm({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });
      setForm(initialState);
      setSuccessMessage('Message sent successfully. I will get back to you soon.');
      setTimeout(() => setSuccessMessage(''), 2800);
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong while submitting the form.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section">
      <SectionHeading
        title="Contact Me"
        subtitle="Reach me directly using the links below, or send your message using the form."
      />
      <Motion.article
        className="contact-card glass"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
      >
        <div className="contact-list">
          <div className="contact-row">
            <p className="contact-label">Email</p>
            <a className="contact-link" href={`mailto:${contactInfo.email}`}>
              {contactInfo.email}
            </a>
          </div>
          <div className="contact-row">
            <p className="contact-label">Phone</p>
            <a className="contact-link" href={`tel:${contactInfo.phone}`}>
              {contactInfo.phone}
            </a>
          </div>
          <div className="contact-row">
            <p className="contact-label">LinkedIn</p>
            <a className="contact-link" href={contactInfo.linkedin} target="_blank" rel="noreferrer">
              View LinkedIn Profile
            </a>
          </div>
          <div className="contact-row">
            <p className="contact-label">GitHub</p>
            <a className="contact-link" href={contactInfo.github} target="_blank" rel="noreferrer">
              View GitHub Profile
            </a>
          </div>
        </div>
      </Motion.article>
      <Motion.form
        className="contact-form glass"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45 }}
      >
        <label htmlFor="name">
          Name
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
          />
          {formErrors.name ? <span className="field-error">{formErrors.name}</span> : null}
        </label>

        <label htmlFor="email">
          Email
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
          />
          {formErrors.email ? <span className="field-error">{formErrors.email}</span> : null}
        </label>

        <label htmlFor="message">
          Message
          <textarea
            id="message"
            name="message"
            rows="5"
            placeholder="Share project scope, timelines, and goals."
            value={form.message}
            onChange={handleChange}
          />
          {formErrors.message ? <span className="field-error">{formErrors.message}</span> : null}
        </label>

        {submitError ? <p className="submit-error">{submitError}</p> : null}

        <button type="submit" className="btn btn-primary submit-btn" disabled={submitting || hasErrors}>
          {submitting ? 'Sending...' : 'Send Message'}
        </button>

        <AnimatePresence>{successMessage ? <SuccessToast message={successMessage} /> : null}</AnimatePresence>
      </Motion.form>
    </section>
  );
}

export default ContactSection;

