const axios = require("axios");

const sendContactEmails = async (contact) => {
  try {
    // Email to Owner
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
        subject: `📩 New Portfolio Contact from ${contact.name}`,
        textContent: `Hello ${process.env.OWNER_NAME},

You have received a new message from your portfolio website.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Name:
${contact.name}

📧 Email:
${contact.email}

📱 Phone:
${contact.countryCode} ${contact.phone}

💬 Message:
${contact.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Please reply to the visitor as soon as possible.

Regards,
Portfolio Contact System`,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    // Email to User
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
        subject: "Thank you for contacting me!",
        textContent: `Dear ${contact.name},

Thank you for contacting me through my portfolio website.

I have successfully received your message and appreciate your interest.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR SUBMISSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name:
${contact.name}

Email:
${contact.email}

Phone:
${contact.countryCode} ${contact.phone}

Message:
${contact.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

I will review your message and get back to you as soon as possible.

If your enquiry is urgent, you can contact me directly.

📧 Email:
${process.env.OWNER_EMAIL}

📞 Phone:
${process.env.OWNER_PHONE}

Thank you for visiting my portfolio.

Best Regards,

${process.env.OWNER_NAME}
Computer Science Engineering Student
GIET University
Odisha, India`,
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