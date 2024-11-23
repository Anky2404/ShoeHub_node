const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

// Import routes
const userRoutes = require('./routes/userRoutes');
const visorRoutes = require('./routes/visorRoutes');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Session middleware 
app.use(session({
  secret: 'Anky@123', 
  resave: false,
  saveUninitialized: true,
}));

// Flash middleware
app.use(flash());

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// static file from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', userRoutes);
app.use('/Supervisor', visorRoutes);

// Pass flash message to view
app.use((req, res, next) => {
  //pass empty message if not get
  res.locals.user = req.session.user || null; 
  res.locals.admin = req.session.admin || null; 
  res.locals.message = req.flash('message').length > 0 ? req.flash('message') : ''; 
  res.locals.results = req.flash('results').length > 0 ? req.flash('results') : ''; 
 
  next();
});




// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
