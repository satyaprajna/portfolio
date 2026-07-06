const dns = require("dns");
const nodemailer = require("nodemailer");

dns.setDefaultResultOrder("ipv4first");

const requiredConfigKeys = [
  "SMTP_USER",
  "SMTP_PASS",
  "OWNER_EMAIL",
  "OWNER_PHONE",
];

const getMissingConfigKeys = () =>
  requiredConfigKeys.filter((key) => !process.env[key]);

const getContactPhone = (contact) => {
  const countryCode = contact.countryCode || "";
  const phone = contact.phone || "";
  return `${countryCode} ${phone}`.trim();
};

const getSubmittedAt = (contact) => {
  const date = contact.createdAt ? new Date(contact.createdAt) : new Date();
  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  family: 4,
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});
transporter.verify((error, success) => {
    if (error) {
        console.error("SMTP Verify Error:", error);
    } else {
        console.log("SMTP Server is ready");
    }
});

const buildOwnerEmail = (contact) => {
  return `
New contact form submission

Name: ${contact.name}
Email: ${contact.email}
Phone: ${getContactPhone(contact)}
Message: ${contact.message || ""}

Submitted at: ${getSubmittedAt(contact)}
`;
};

const buildUserEmail = (contact) => {
  return `
Hi ${contact.name},

Thank you for contacting me.

I have received your message and I will contact you soon.

Phone: ${process.env.OWNER_PHONE}
Email: ${process.env.OWNER_EMAIL}

Regards,
${process.env.OWNER_NAME || "Satya"}
`;
};

const sendContactEmails = async (contact) => {
  const missingConfig = getMissingConfigKeys();

  if (missingConfig.length) {
    return {
      sent: false,
      skipped: true,
      message: `Missing config: ${missingConfig.join(", ")}`,
    };
  }

  try {
    await transporter.verify();
    console.log("✅ SMTP Connected");

    await transporter.sendMail({
      from: `"${process.env.OWNER_NAME}" <${process.env.SMTP_USER}>`,
      to: process.env.OWNER_EMAIL,
      replyTo: contact.email,
      subject: `New Contact from ${contact.name}`,
      text: buildOwnerEmail(contact),
    });

    await transporter.sendMail({
      from: `"${process.env.OWNER_NAME}" <${process.env.SMTP_USER}>`,
      to: contact.email,
      replyTo: process.env.OWNER_EMAIL,
      subject: "Thank you for contacting me",
      text: buildUserEmail(contact),
    });

    return {
      sent: true,
      skipped: false,
      message: "Emails sent successfully",
    };
  } catch (err) {
    console.error("Email Error:", err);

    return {
      sent: false,
      skipped: false,
      message: err.message,
      error: err.message,
    };
  }
};

module.exports = {
  sendContactEmails,
};