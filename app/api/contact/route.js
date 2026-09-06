import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Linear-time email format check — safe on uncontrolled input (no backtracking).
// Replaces polynomial regex /^[^\s@]+@[^\s@]+\.[^\s@]+$/ (CodeQL: js/polynomial-redos).
function isValidEmail(value) {
  if (value.length === 0 || value.length > 254) return false;
  const atIndex = value.indexOf('@');
  if (atIndex === -1 || atIndex !== value.lastIndexOf('@')) return false;
  const local = value.slice(0, atIndex);
  const domain = value.slice(atIndex + 1);
  if (local.length === 0 || domain.length === 0) return false;
  if (/\s/.test(value)) return false;
  const lastDot = domain.lastIndexOf('.');
  if (lastDot === -1 || lastDot === 0 || lastDot === domain.length - 1) return false;
  return true;
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body.' },
      { status: 400 }
    );
  }

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim();
  const message = (body.message ?? '').trim();

  // Server-side validation — never trust client alone
  const errors = {};
  if (!name) errors.name = 'Name is required.';
  if (!email) {
    errors.email = 'Email is required.';
  } else if (!isValidEmail(email)) {
    errors.email = 'Email format is invalid.';
  }
  if (!message) errors.message = 'Message is required.';

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { success: false, message: 'Validation failed.', errors },
      { status: 422 }
    );
  }

  // RESEND_API_KEY must be set in .env.local — never exposed to the client
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      {
        success: false,
        message:
          'Contact form is not yet configured. Please reach out directly at abdulkadirk059@gmail.com.',
      },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      // Must be a domain verified in your Resend account.
      // Use 'onboarding@resend.dev' for testing on Resend's shared domain.
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'abdulkadirk059@gmail.com',
      reply_to: email,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      // Log server-side only — never expose provider error details to clients
      console.error('[contact] Resend error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to send message. Please try again.' },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return NextResponse.json(
      { success: false, message: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true, message: "Message sent! I'll get back to you soon." },
    { status: 200 }
  );
}
