import * as React from 'react';

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
  <html>
    <head>
      <style>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #000000 0%, #333333 100%);
          color: white;
          padding: 30px;
          border-radius: 8px 8px 0 0;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .content {
          background: #f9f9f9;
          padding: 30px;
          border: 1px solid #e0e0e0;
          border-top: none;
        }
        .field {
          margin-bottom: 20px;
        }
        .label {
          font-weight: bold;
          color: #666;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }
        .value {
          color: #333;
          font-size: 16px;
          padding: 12px;
          background: white;
          border-radius: 6px;
          border: 1px solid #e0e0e0;
        }
        .message-box {
          white-space: pre-wrap;
          line-height: 1.8;
        }
        .footer {
          background: #f0f0f0;
          padding: 20px;
          border-radius: 0 0 8px 8px;
          text-align: center;
          font-size: 14px;
          color: #666;
        }
        .reply-button {
          display: inline-block;
          padding: 12px 24px;
          background: #000;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          margin-top: 10px;
          font-weight: 600;
        }
      `}</style>
    </head>
    <body>
      <div className="header">
        <h1>📧 New Contact Form Submission</h1>
      </div>

      <div className="content">
        <div className="field">
          <div className="label">From</div>
          <div className="value">{name}</div>
        </div>

        <div className="field">
          <div className="label">Email Address</div>
          <div className="value">
            <a href={`mailto:${email}`} style={{ color: '#000', textDecoration: 'none' }}>
              {email}
            </a>
          </div>
        </div>

        <div className="field">
          <div className="label">Message</div>
          <div className="value message-box">{message}</div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <a href={`mailto:${email}?subject=Re: Your message to Henry C. Melo`} className="reply-button">
            Reply to {name}
          </a>
        </div>
      </div>

      <div className="footer">
        <p>This message was sent from your portfolio contact form.</p>
        <p>
          <a href="https://henrycastillomelo.com/admin" style={{ color: '#666' }}>
            View in Admin Dashboard
          </a>
        </p>
      </div>
    </body>
  </html>
);

export default ContactNotificationEmail;
