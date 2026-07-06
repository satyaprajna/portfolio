const express = require('express');
const router = express.Router();
const Contact = require('../model/contact_details');
const { sendContactEmails } = require('../utils/emailService');

console.log('✓ Routes file loaded');

// Create Contact
router.post('/create', async (req, res) => {
    try {
        const contact = new Contact(req.body);
        const savedContact = await contact.save();
        const emailStatus = await sendContactEmails(savedContact);

        if (!emailStatus.sent) {
            console.warn(emailStatus.message);
        }

        res.status(201).json({
            success: true,
            message: emailStatus.sent
                ? 'Contact created successfully'
                : 'Contact created successfully, but email was not sent',
            emailSent: emailStatus.sent,
            emailError: emailStatus.error || null,
            data: savedContact
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get all contacts
router.get('/all', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

const isValidObjectId = (id) => {
    // Avoid importing mongoose just for isValidObjectId
    // Mongoose will validate at query time, but we can return 400 early
    return typeof id === 'string' && id.length > 0;
};

// Get contact by ID
router.get('/contact/:id', async (req, res) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid contact id'
            });
        }

        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        res.status(200).json({
            success: true,
            data: contact
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Update contact
router.put('/update/:id', async (req, res) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid contact id'
            });
        }

        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedContact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Contact updated successfully',
            data: updatedContact
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Delete contact
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);

        if (!deletedContact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Contact deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
