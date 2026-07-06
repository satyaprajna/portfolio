const axios = require("axios");

const sendContactEmails = async (contact) => {
  try {
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
          },
        ],
        subject: `New Contact from ${contact.name}`,
        textContent: `
Name: ${contact.name}
Email: ${contact.email}
Phone: ${contact.countryCode} ${contact.phone}

Message:
${contact.message}
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

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
          },
        ],
        subject: "Thank you for contacting me",
        textContent: `
Hi ${contact.name},

Thank you for contacting me.

I have received your message and will get back to you soon.

Regards,
${process.env.OWNER_NAME}
${process.env.OWNER_PHONE}
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
    console.error(err.response?.data || err.message);

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