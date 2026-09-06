'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Phone from '@mui/icons-material/Phone';
import LocationOn from '@mui/icons-material/LocationOn';
import LinkedIn from '@mui/icons-material/LinkedIn';
import GitHub from '@mui/icons-material/GitHub';
import Mail from '@mui/icons-material/Mail';
import { SectionTitle } from '../SectionComponents';
import styles from './ContactSection.module.css';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  // 'idle' | 'submitting' | 'success' | 'error'
  const [status, setStatus] = useState('idle');
  const [serverMessage, setServerMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-level error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prevent duplicate submissions
    if (status === 'submitting') return;

    setStatus('submitting');
    setServerMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setServerMessage(data.message || "Message sent! I'll get back to you soon.");
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setServerMessage(
          data.message || 'Something went wrong. Please try again or email directly.'
        );
        // Merge any server-side field errors
        if (data.errors) {
          setErrors((prev) => ({ ...prev, ...data.errors }));
        }
      }
    } catch {
      setStatus('error');
      setServerMessage(
        'Network error — please check your connection or email abdulkadirk059@gmail.com directly.'
      );
    }
  };

  return (
    <Box id="contact" sx={{ py: 4, position: 'relative', overflow: 'hidden' }}>
      <SectionTitle>Get In Touch</SectionTitle>

      <Grid container spacing={4} sx={{ maxWidth: '1200px', margin: '0 auto', px: 2 }}>
        {/* Left — Contact Info */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <div className={styles.contactCard}>
            <div className={styles.contactInfo}>
              <div className={styles.infoItem}>
                <Mail className={styles.infoIcon} />
                <span className={styles.infoText}>abdulkadirk059@gmail.com</span>
              </div>
              <div className={styles.infoItem}>
                <Phone className={styles.infoIcon} />
                <span className={styles.infoText}>+91 7081071456</span>
              </div>
              <div className={styles.infoItem}>
                <LocationOn className={styles.infoIcon} />
                <span className={styles.infoText}>India</span>
              </div>
            </div>

            <div className={styles.socialLinks}>
              <a
                href="https://www.linkedin.com/in/abdul-kadir-pathan5439/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="LinkedIn"
              >
                <LinkedIn />
              </a>
              <a
                href="https://github.com/khankadir193"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="GitHub"
              >
                <GitHub />
              </a>
              <a
                href="mailto:abdulkadirk059@gmail.com"
                className={styles.socialIcon}
                aria-label="Email"
              >
                <Mail />
              </a>
            </div>

            <div className={styles.resumeSection}>
              <a
                href="/cv/Kadir-CV.pdf"
                download="Kadir-CV.pdf"
                className={styles.downloadResumeBtn}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume
              </a>
            </div>
          </div>
        </Grid>

        {/* Right — Contact Form */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <form onSubmit={handleSubmit} className={styles.contactForm} noValidate>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="contact-name">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="Your name"
                autoComplete="name"
              />
              {errors.name && (
                <span className={styles.errorText} role="alert">
                  {errors.name}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="contact-email">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="Your email"
                autoComplete="email"
              />
              {errors.email && (
                <span className={styles.errorText} role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={styles.formTextarea}
                placeholder="Your message"
                rows={4}
              />
              {errors.message && (
                <span className={styles.errorText} role="alert">
                  {errors.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className={styles.submitButton}
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>

            {/* Inline status messages — no alert() */}
            {status === 'success' && (
              <div className={styles.successMessage} role="status">
                {serverMessage}
              </div>
            )}
            {status === 'error' && (
              <div className={styles.errorMessage} role="alert">
                {serverMessage}
              </div>
            )}
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}
