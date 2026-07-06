const axios = require("axios");

const sendContactEmails = async (contact) => {
  try {
    // Email to Portfolio Owner
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: process.env.OWNER_NAME,
          email: process.env.OWNER_EMAIL,
        },
        to: [
          {
            email: process.env.OWNER_EMAIL,
            name: process.env.OWNER_NAME,
          },
        ],
        subject: `New Portfolio Contact - ${contact.name}`,
        textContent: `Hello ${process.env.OWNER_NAME},

You have received a new contact form submission from your portfolio website.

Name: ${contact.name}
Email: ${contact.email}
Phone: ${contact.countryCode} ${contact.phone}

Message:
${contact.message}

Please respond to the sender when convenient.

This is an automated email from your portfolio website.
`,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    // Confirmation Email to Visitor
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: process.env.OWNER_NAME,
          email: process.env.OWNER_EMAIL,
        },
        to: [
          {
            email: contact.email,
            name: contact.name,
          },
        ],
        subject: "Thank You for Reaching Out",
        textContent: `Dear ${contact.name},
Thank you for getting in touch through my portfolio website.

I have received your message and will get back to you as soon as possible.

Your Submission

Name: ${contact.name}
Email: ${contact.email}
Phone: ${contact.countryCode} ${contact.phone}

Message:
${contact.message}

If you need immediate assistance, please contact me directly.

Email: ${process.env.OWNER_EMAIL}
Phone: ${process.env.OWNER_PHONE}

Best regards,

${process.env.OWNER_NAME}
`,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return {
      sent: true,
      skipped: false,
      message: "Emails sent successfully",
    };
  } catch (err) {
    console.error("Brevo Error:", err.response?.data || err.message);

    return {
      sent: false,
      skipped: false,
      message: err.response?.data?.message || err.message,
    };
  }
};

module.exports = {
  sendContactEmails,
};