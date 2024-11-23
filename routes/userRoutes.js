const express = require('express');
const userController = require('../controllers/userController'); 
const router = express.Router();



// Render home page
router.get('/', (req, res) => {
    res.render('index', {
        message: req.flash('message'), 
        results: req.flash('results'),
        user: req.session.user
    }); 
});

//Render about page
router.get('/About', (req, res) => {
    res.render('about');

});

//Render Contact page
router.get('/Contact', (req, res) => {
    res.render('contact');

});

//Render Cart page
router.get('/Cart', (req, res) => {
    res.render('Cart');

});

//Render Products page
router.get('/Products', (req, res) => {
    res.render('contact');

});
//Render Checkout page
router.get('/Checkout', (req, res) => {
    res.render('Checkout');

});

//Render Product/Details page
router.get('/Product/Details', (req, res) => {
    res.render('Product-Detail');

});

// Render Register page
router.get('/Register', (req, res) => {
    res.render('register', {
        message: req.flash('message'), 
        results: req.flash('results'),
        user: req.session.user
    });
});

// Handle user registration
router.post('/Register', userController.register);


// Render Login page
router.get('/Login', (req, res) => {
    if (req.session.user) {
        req.flash('message', 'You have already logged in.')
        req.flash('results', 'error')
        return res.redirect('/');
    }else{
        res.render('login', {
            message: req.flash('message'), 
            results: req.flash('results'),
            user: req.session.user
        });
    }
    
});

// Handle user Login
router.post('/Login', userController.login);














module.exports = router;
