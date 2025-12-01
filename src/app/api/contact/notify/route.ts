import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import ContactNotificationEmail from '@/emails/ContactNotificationEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email notification
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Portfolio <noreply@henrycastillomelo.com>',
      to: process.env.EMAIL_TO || 'your@email.com',
      subject: `New Contact Form Message from ${name}`,
      react: ContactNotificationEmail({ name, email, message }),
      // Also send plain text version as fallback
      text: `
New Contact Form Submission

From: ${name}
Email: ${email}

Message:
${message}

Reply to: ${email}
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email notification' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Email notification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
