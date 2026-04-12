'use client';

import { useState } from 'react';
import { Box, TextField, Button, Grid, Paper } from '@mui/material';
import { Email, Phone, LocationOn, LinkedIn, GitHub, Mail } from '@mui/icons-material';
import styles from './ContactSection.module.css';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    setStatus('');

    alert(`Message sent! (Demo)\nName: ${formData.name}\nEmail: ${formData.email}\nTo: abdulkadirk059@gmail.com`);

    setSubmitting(false);
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Box id="contact" sx={{ py: 8, position: 'relative', overflow: 'hidden' }}>
      <div className={styles.sectionTitle}>Get In Touch</div>
      
      <Grid container spacing={4} sx={{ maxWidth: '1200px', margin: '0 auto', px: 2 }}>
        {/* Left - Contact Info */}
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
              <a href="https://linkedin.com/in/abdul-kadir-khan-77bb68291" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
                <LinkedIn />
              </a>
              <a href="https://github.com/khankadir193" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="GitHub">
                <GitHub />
              </a>
              <a href="mailto:abdulkadirk059@gmail.com" className={styles.socialIcon} aria-label="Email">
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

        {/* Right - Contact Form */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="Your name"
              />
              {errors.name && <span className={styles.errorText}>{errors.name}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="Your email"
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={styles.formTextarea}
                placeholder="Your message"
                rows={4}
              />
              {errors.message && <span className={styles.errorText}>{errors.message}</span>}
            </div>

            <button 
              type="submit" 
              disabled={submitting}
              className={styles.submitButton}
            >
              {submitting ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <div className={styles.successMessage}>
                Message sent successfully! I'll get back to you soon.
              </div>
            )}
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}
