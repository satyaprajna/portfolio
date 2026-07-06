const nodemailer = require('nodemailer');

const requiredConfigKeys = ['SMTP_USER', 'SMTP_PASS', 'OWNER_EMAIL', 'OWNER_PHONE'];

const getMissingConfigKeys = () => requiredConfigKeys.filter((key) => !process.env[key]);

const getContactPhone = (contact) => {
    const countryCode = contact.countryCode || '';
    const phone = contact.phone || '';
    return `${countryCode} ${phone}`.trim();
};

const getSubmittedAt = (contact) => {
    const date = contact.createdAt ? new Date(contact.createdAt) : new Date();
    return date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
};

const createTransporter = () => {
    const port = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER?.trim() || '';
    const smtpPass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');

    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port,
        secure: process.env.SMTP_SECURE === 'true' || port === 465,
        auth: {
            user: smtpUser,
            pass: smtpPass
        }
    });
};

const buildOwnerEmail = (contact) => {
    return [
        'New contact form submission',
        '',
        `Name: ${contact.name}`,
        `Email: ${contact.email}`,
        `Phone: ${getContactPhone(contact)}`,
        `Message: ${contact.message || ''}`,
        `Submitted at: ${getSubmittedAt(contact)}`
    ].join('\n');
};

const buildUserEmail = (contact) => {
    const ownerName = process.env.OWNER_NAME || 'Satya';

    return [
        `Hi ${contact.name},`,
        '',
        'Thank you for contacting me. I received your details and I will contact you soon.',
        '',
        'For urgent contact:',
        `Phone: ${process.env.OWNER_PHONE}`,
        `Email: ${process.env.OWNER_EMAIL}`,
        '',
        'Your submitted details:',
        `Name: ${contact.name}`,
        `Email: ${contact.email}`,
        `Phone: ${getContactPhone(contact)}`,
        `Message: ${contact.message || ''}`,
        '',
        `Regards,`,
        ownerName
    ].join('\n');
};

const sendContactEmails = async (contact) => {
    const missingConfigKeys = getMissingConfigKeys();

    if (missingConfigKeys.length > 0) {
        return {
            sent: false,
            skipped: true,
            message: `Email skipped. Missing config: ${missingConfigKeys.join(', ')}`
        };
    }

    const ownerName = process.env.OWNER_NAME || 'Contact Admin';
    const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER.trim();
    const fromName = process.env.FROM_NAME || ownerName;
    const transporter = createTransporter();

    const emails = [
        transporter.sendMail({
            from: `"${fromName}" <${fromEmail}>`,
            to: process.env.OWNER_EMAIL,
            replyTo: contact.email,
            subject: `New contact request from ${contact.name}`,
            text: buildOwnerEmail(contact)
        }),
        transporter.sendMail({
            from: `"${fromName}" <${fromEmail}>`,
            to: contact.email,
            replyTo: process.env.OWNER_EMAIL,
            subject: 'Thank you for contacting me',
            text: buildUserEmail(contact)
        })
    ];

    const results = await Promise.allSettled(emails);
    const failedResults = results.filter((result) => result.status === 'rejected');

    if (failedResults.length > 0) {
        return {
            sent: false,
            skipped: false,
            message: failedResults.map((result) => result.reason.message).join('; ')
        };
    }

    return {
        sent: true,
        skipped: false,
        message: 'Contact emails sent successfully'
    };
};

module.exports = {
    sendContactEmails
};
