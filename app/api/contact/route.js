import { NextResponse } from 'next/server';

/**
 * POST /api/contact
 *
 * Server-side contact form handler.
 *
 * Email provider integration point:
 * ──────────────────────────────────
 * To enable real email delivery, set these environment variables and
 * uncomment the relevant section below:
 *
 *   EMAIL_USER     — SMTP username / sender address
 *   EMAIL_PASS     — SMTP password or app-specific password
 *   EMAIL_TO       — recipient address (e.g. abdulkadirk059@gmail.com)
 *
 * Supported options:
 *   - Nodemailer + Gmail SMTP (see commented block below)
 *   - Resend (https://resend.com) — recommended for production
 *   - Any other server-side email provider
 *
 * Security:
 *   - All validation is performed server-side.
 *   - No credentials are exposed to the client.
 *   - API keys / passwords MUST be in environment variables only.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  let body;

  // Parse request body safely
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body.' },
      { status: 400 }
    );
  }

  // Sanitise inputs
  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim();
  const message = (body.message ?? '').trim();

  // Server-side validation (mirrors client validation; never trust client alone)
  const errors = {};
  if (!name) errors.name = 'Name is required.';
  if (!email) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Email format is invalid.';
  }
  if (!message) errors.message = 'Message is required.';

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { success: false, message: 'Validation failed.', errors },
      { status: 422 }
    );
  }

  // ── Email provider integration ──────────────────────────────────────────
  //
  // Uncomment and configure ONE of the sections below once you have
  // set the required environment variables.
  //
  // ── Option A: Nodemailer + Gmail SMTP ───────────────────────────────────
  //
  // import nodemailer from 'nodemailer';  // npm install nodemailer
  //
  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: process.env.EMAIL_USER,
  //     pass: process.env.EMAIL_PASS,
  //   },
  // });
  //
  // await transporter.sendMail({
  //   from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
  //   to: process.env.EMAIL_TO,
  //   replyTo: email,
  //   subject: `Portfolio contact from ${name}`,
  //   text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  // });
  //
  // ── Option B: Resend ────────────────────────────────────────────────────
  //
  // import { Resend } from 'resend';  // npm install resend
  //
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: 'onboarding@resend.dev',
  //   to: process.env.EMAIL_TO,
  //   replyTo: email,
  //   subject: `Portfolio contact from ${name}`,
  //   text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  // });
  //
  // ───────────────────────────────────────────────────────────────────────

  // Check whether an email provider is configured
  const isConfigured = !!(process.env.EMAIL_USER || process.env.RESEND_API_KEY);

  if (!isConfigured) {
    // No email provider configured — return a clear informational response.
    // This avoids pretending that a message was sent when it wasn't.
    return NextResponse.json(
      {
        success: false,
        message:
          'Contact form is not yet configured. Please reach out directly at abdulkadirk059@gmail.com.',
      },
      { status: 503 }
    );
  }

  // If provider IS configured (after uncommenting one of the options above):
  return NextResponse.json(
    { success: true, message: "Message sent! I'll get back to you soon." },
    { status: 200 }
  );
}
