const express = require('express');
const userController = require('../controllers/userController'); 
const router = express.Router();



// Render Dashboard page
router.get('/', (req, res) => {
    res.render('backend/dashboard', {
        message: req.flash('message'), 
        results: req.flash('results'),
        admin: req.session.admin
    }); 
});


// Render Staff page
router.get('/Staffs', userController.allStaffs);

// Render AddStaff page
router.get('/AddStaff', (req, res) => {
    res.render('backend/AddStaff', {
        message: req.flash('message'), 
        results: req.flash('results'),
        admin: req.session.admin
    }); 
});

router.post('/AddStaff', userController.addStaff);


// Render Customer page
router.get('/Customers', userController.allCustomers);


// Render Categories page
router.get('/EditCustomer', (req, res) => {
    res.render('backend/EditCustomer', {
        message: req.flash('message'), 
        results: req.flash('results'),
        admin: req.session.admin
    }); 
});

// Render Categories page
router.get('/CustomerDetails', (req, res) => {
    res.render('backend/CustomerDetails', {
        message: req.flash('message'), 
        results: req.flash('results'),
        admin: req.session.admin
    }); 
});

// Render Categories page
router.get('/Categories', (req, res) => {
    res.render('backend/Categories', {
        message: req.flash('message'), 
        results: req.flash('results'),
        admin: req.session.admin,
        customers: userController.allCustomers
    }); 
});


// Render Products page
router.get('/Products', (req, res) => {
    res.render('backend/product', {
        message: req.flash('message'), 
        results: req.flash('results'),
        admin: req.session.admin
    }); 
});


// Render Orders page
router.get('/Orders', (req, res) => {
    res.render('backend/order', {
        message: req.flash('message'), 
        results: req.flash('results'),
        admin: req.session.admin
    }); 
});

// Render Queries page
router.get('/Queries', (req, res) => {
    res.render('backend/Query', {
        message: req.flash('message'), 
        results: req.flash('results'),
        admin: req.session.admin
    }); 
});


// Render Login page
router.get('/Login', (req, res) => {
    res.render('backend/Login', {
        message: req.flash('message'), 
        results: req.flash('results'),
        admin: req.session.admin
    }); 
});

router.post('/Login', userController.adminLogin);











module.exports = router;