require("dotenv").config();

const express = require("express");
const router = express.Router();

const Contact = require("../model/contact_details");

// Home Route
router.get("/", (req, res) => {
  res.send("Hello from Contact API");
});

// About Route
router.get("/about", (req, res) => {
  res.send("This is the Contact API");
});

// =============================
// CREATE CONTACT
// =============================
router.post("/create", async (req, res) => {
  try {
    const newContact = new Contact(req.body);

    const savedData = await newContact.save();

    res.status(201).json({
      success: true,
      data: savedData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// =============================
// GET ALL CONTACTS
// =============================
router.get("/all", async (req, res) => {
  try {
    const contacts = await Contact.find();

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// =============================
// GET CONTACT BY ID
// =============================
router.get("/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;