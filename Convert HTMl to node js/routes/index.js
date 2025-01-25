const express = require('express');
const submitContact = require('../controllers/contact.controller');
const getAllProducts = require('../controllers/product.controller');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
    });

router.get('/about', (req, res) => {
    res.render('about');
    });

router.get('/contact', (req, res) => {
    res.render('contact');
    });

router.post('/contact', submitContact);
router.get('/product', getAllProducts)

module.exports = router;