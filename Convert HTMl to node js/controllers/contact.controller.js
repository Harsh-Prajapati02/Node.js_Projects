const Contact = require("../models/contact");


const submitContact = async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const contact = new Contact({ name, email, message });
        await contact.save();
        res.status(201).json({ message: "Contact form submitted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });   
    }
}

module.exports = submitContact;