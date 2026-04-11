'use client';

import { useState } from 'react';
import { 
  Container, Box, TextField, Button, Typography, Grid, Paper, Alert 
} from '@mui/material';
import { Email, Phone, Send, Person, Subject as SubjectIcon, Message } from '@mui/icons-material';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
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
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
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

    alert(`Message sent! (Demo)\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\nTo: abdulkadirk059@gmail.com`);

    setSubmitting(false);
    setStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const inputIcons = {
    name: <Person sx={{ color: 'rgba(56, 189, 248, 0.7)' }} />,
    email: <Email sx={{ color: 'rgba(56, 189, 248, 0.7)' }} />,
    subject: <SubjectIcon sx={{ color: 'rgba(56, 189, 248, 0.7)' }} />,
    message: <Message sx={{ color: 'rgba(56, 189, 248, 0.7)' }} />
  };

  return (
    <Box id="contact" sx={{ 
      py: 8, 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" sx={{ 
          mb: 6, 
          textAlign: 'center',
          background: 'linear-gradient(135deg, #38bdf8, #06b6d4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 800,
          fontSize: { xs: '2.5rem', md: '3.5rem' }
        }}>
          Get In Touch
        </Typography>
        
        <Grid container spacing={4}>
          {/* Left - Form */}
          <Grid size={{ xs: 12, lg: 7 }}>
            <Paper elevation={0} sx={{
              p: { xs: 4, md: 6 },
              background: 'rgba(17, 24, 39, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              borderRadius: '24px',
              position: 'relative'
            }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      InputProps={{
                        startAdornment: inputIcons.name
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      InputProps={{
                        startAdornment: inputIcons.email
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      error={!!errors.subject}
                      helperText={errors.subject}
                      InputProps={{
                        startAdornment: inputIcons.subject
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      error={!!errors.message}
                      helperText={errors.message}
                      InputProps={{
                        startAdornment: inputIcons.message
                      }}
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  disabled={submitting}
                  startIcon={<Send />}
                  sx={{
                    mt: 3,
                    py: 2.5,
                    background: 'linear-gradient(135deg, #38bdf8, #06b6d4)',
                    borderRadius: '20px',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    color: 'white',
                    boxShadow: '0 8px 25px rgba(56, 189, 248, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #06b6d4, #38bdf8)',
                      boxShadow: '0 12px 35px rgba(56, 189, 248, 0.5)',
                      transform: 'translateY(-2px)'
                    },
                    '&:disabled': {
                      background: 'rgba(56, 189, 248, 0.5)',
                      color: 'white'
                    }
                  }}
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </Button>

                {status === 'success' && (
                  <Paper sx={{ 
                    mt: 3, 
                    p: 3, 
                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(74, 222, 128, 0.1))',
                    border: '1px solid rgba(34, 197, 94, 0.5)',
                    borderRadius: '20px',
                    textAlign: 'center',
                    boxShadow: '0 10px 30px rgba(34, 197, 94, 0.2)'
                  }}>
                    <Send sx={{ color: '#22c55e', fontSize: '2rem', mb: 2, mx: 'auto', display: 'block' }} />
                    <Typography variant="h6" sx={{ color: '#22c55e', fontWeight: 700, mb: 1 }}>
                      Message Sent Successfully!
                    </Typography>
                    <Typography sx={{ color: 'rgba(226, 232, 240, 0.8)' }}>
                      Thank you! I'll get back to you soon.
                    </Typography>
                  </Paper>
                )}
              </form>
            </Paper>
          </Grid>

          {/* Right - Contact Info */}
          <Grid item xs={12} lg={5}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h4" sx={{ 
                mb: 4, 
                background: 'linear-gradient(135deg, #38bdf8, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700
              }}>
                Let's Talk
              </Typography>
              <Typography sx={{ mb: 4, color: 'rgba(226, 232, 240, 0.9)', lineHeight: 1.8 }}>
                Have a project in mind? I'd love to hear from you.
              </Typography>

              <Paper sx={{
                p: 3,
                background: 'rgba(17, 24, 39, 0.6)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                borderRadius: '16px',
                mb: 3
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Email />
                  <Box>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Email</Typography>
                    <Typography sx={{ fontWeight: 600 }}>
                      abdulkadirk059@gmail.com
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              <Paper sx={{
                p: 3,
                background: 'rgba(17, 24, 39, 0.6)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                borderRadius: '16px'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Phone />
                  <Box>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Phone</Typography>
                    <Typography sx={{ fontWeight: 600 }}>
                      +91 7081071456
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
