import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface ContactNotificationEmailProps {
  name: string;
  email: string;
  message: string;
}

export const ContactNotificationEmail: React.FC<ContactNotificationEmailProps> = ({
  name,
  email,
  message,
}) => (
  <Html>
    <Head />
    <Preview>New contact form message from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header */}
        <Section style={header}>
          <Heading style={headerTitle}>📧 New Contact Form Submission</Heading>
        </Section>

        {/* Content */}
        <Section style={content}>
          {/* Name Field */}
          <div style={field}>
            <Text style={label}>FROM</Text>
            <Text style={value}>{name}</Text>
          </div>

          {/* Email Field */}
          <div style={field}>
            <Text style={label}>EMAIL ADDRESS</Text>
            <Text style={value}>
              <Link href={`mailto:${email}`} style={emailLink}>
                {email}
              </Link>
            </Text>
          </div>

          {/* Message Field */}
          <div style={field}>
            <Text style={label}>MESSAGE</Text>
            <Text style={messageBox}>{message}</Text>
          </div>

          {/* Reply Button */}
          <Section style={buttonContainer}>
            <Link
              href={`mailto:${email}?subject=Re: Your message to Henry C. Melo`}
              style={button}
            >
              Reply to {name}
            </Link>
          </Section>
        </Section>

        {/* Footer */}
        <Section style={footer}>
          <Text style={footerText}>
            This message was sent from your portfolio contact form.
          </Text>
          <Text style={footerText}>
            <Link href="https://henrycastillomelo.com/admin" style={footerLink}>
              View in Admin Dashboard
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ContactNotificationEmail;

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const header = {
  background: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
  borderRadius: '8px 8px 0 0',
  padding: '30px',
};

const headerTitle = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0',
};

const content = {
  backgroundColor: '#f9f9f9',
  padding: '30px',
  border: '1px solid #e0e0e0',
  borderTop: 'none',
};

const field = {
  marginBottom: '20px',
};

const label = {
  color: '#666666',
  fontSize: '14px',
  fontWeight: 'bold',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '0 0 8px 0',
};

const value = {
  color: '#333333',
  fontSize: '16px',
  padding: '12px',
  backgroundColor: '#ffffff',
  borderRadius: '6px',
  border: '1px solid #e0e0e0',
  margin: '0',
};

const emailLink = {
  color: '#000000',
  textDecoration: 'none',
};

const messageBox = {
  ...value,
  whiteSpace: 'pre-wrap' as const,
  lineHeight: '1.8',
};

const buttonContainer = {
  textAlign: 'center' as const,
  marginTop: '30px',
};

const button = {
  backgroundColor: '#000000',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
};

const footer = {
  backgroundColor: '#f0f0f0',
  padding: '20px',
  borderRadius: '0 0 8px 8px',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#666666',
  fontSize: '14px',
  margin: '0 0 8px 0',
};

const footerLink = {
  color: '#666666',
  textDecoration: 'underline',
};
