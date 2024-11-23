const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require('moment');

// Register a new user
exports.register = async (req, res) => {
  // const { firstname, lastname, email, phone, gender, dob, password } = req.body
  // const status = 1
  // const role='Customer';
  // try {
  //   // Hash the password before saving it
  //   const hashedPassword = await bcrypt.hash(password, 10)
  //   // Insert user details into the database
  //   const [result] = await db.query(
  //     'INSERT INTO `users`(`firstname`, `lastname`, `email`, `phone`, `gender`, `dob`, `role`, `status`, `password`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
  //     [firstname, lastname, email, phone, gender, dob, role,  status, hashedPassword]
  //   )
  //   // Get last inserted user ID
  //   const userId = result.insertId
  //   // Generate a unique username
  //   const generatedUsername = firstname + '123' + userId
  //   // Update the user with the generated username
  //   await db.query('UPDATE `users` SET `username` = ? WHERE `userID` = ?', [
  //     generatedUsername,
  //     userId
  //   ])
  //   // Store success message in flash
  //   req.flash('message', 'Registration successful!')
  //   req.flash('results', 'success')
  //   // Redirect to Login page
  //   res.redirect('/Login')
  // } catch (error) {
  //   req.flash('message', 'Registration failed! ' + error)
  //   req.flash('results', 'error')
  //   // redirect to register page
  //   res.redirect('/Register')
  // }
};

exports.login = async (req, res) => {
  // const { username, password } = req.body
  // try {
  //   //get data by username
  //   const [result] = await db.query(
  //     'SELECT * FROM `users` WHERE `username`= ?',
  //     [username]
  //   )
  //   // check account is verified
  //   if (result.length === 0) {
  //     // User not found
  //     req.flash('message', 'User not found!')
  //     req.flash('results', 'error')
  //     return res.redirect('/Login')
  //   } else {
  //     //store details in user array
  //     const user = result[0]
  //     //matching with input password
  //   const isMatch = await bcrypt.compare(password, user.password)
  //     if (user.isVerified != 1) {
  //       req.flash('message', 'Login failed! Your account is not verified.')
  //       req.flash('results', 'error')
  //       // redirect to register page
  //       res.redirect('/Login')
  //     } else if (user.status != 1) {
  //       req.flash('message', 'Login failed! Your account has been deactivated.')
  //       req.flash('results', 'error')
  //       // redirect to register page
  //       res.redirect('/Login')
  //     }else if(!isMatch){
  //       req.flash('message', 'Login failed! Password does not match.')
  //       req.flash('results', 'error')
  //       // redirect to register page
  //       res.redirect('/Login')
  //     }else{
  //       //save user id and fullname in session
  //       req.session.user = {
  //         id: user.id,
  //         name: user.firstname+' '+user.lastname
  //     };
  //     // Flash success message
  //     req.flash('message', 'Login successful!');
  //     req.flash('results', 'success');
  //     // Redirect to the homepage or dashboard
  //     return res.redirect('/');
  //     }
  //   }
  // } catch (error) {
  //   req.flash('message', 'Login failed! '+error)
  //       req.flash('results', 'error')
  //       // redirect to register page
  //       res.redirect('/Login')
  // }
};

exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { username: username } });

    if (!user) {
       // User not found
      req.flash('message', 'User not found!')
      req.flash('results', 'error')
      return res.redirect('/Supervisor/Login')
    }else{

      
      //matching with input password
    const isMatch = await bcrypt.compare(password, user.password)

      if (!user.isVerified) {
        req.flash('message', 'Login failed! Your account is not verified.')
        req.flash('results', 'error')
        // redirect to register page
        res.redirect('/Supervisor/Login')
      } else if (!user.status) {
        req.flash('message', 'Login failed! Your account has been deactivated.')
        req.flash('results', 'error')
        // redirect to register page
        res.redirect('/Supervisor/Login')
      }else if(!isMatch){
        req.flash('message', 'Login failed! Password does not match.')
        req.flash('results', 'error')
        // redirect to register page
        res.redirect('/Supervisor/Login')
      }else{
        //save user id and fullname in session
        req.session.admin = {
          id: user.id,
          name: user.firstname+' '+user.lastname
      };
      // Flash success message
      req.flash('message', 'Login successful!');
      req.flash('results', 'success');
      // Redirect to the homepage or dashboard
      return res.redirect('/Supervisor/');
      }
    }
  } catch (err) {
    console.error("Error logging in user:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.allCustomers = async (req, res) => {
  const role='Customer';
  try {
    const users = await User.findAll({
      where: {
          role: role  
      }
  });
       users.forEach(user => {
        user.registeredAt = moment(user.createdAt).format('DD MMM YYYY');
        user.updatedAt = moment(user.updatedAt).format('DD MMM YYYY');
    });
      res.render('backend/customer', {
        message: req.flash('message'), 
        results: req.flash('results'),
        admin: req.session.admin,
        users
    });
  } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Error fetching users');
  }
};

exports.allStaffs = async (req, res) => {
  const role='Staff';
  try {
    const users = await User.findAll({
      where: {
          role: role  
      }
  });
       users.forEach(user => {
        user.registeredAt = moment(user.createdAt).format('DD MMM YYYY');
        user.updatedAt = moment(user.updatedAt).format('DD MMM YYYY');
    });
      res.render('backend/staffs', {
        message: req.flash('message'), 
        results: req.flash('results'),
        admin: req.session.admin,
        users
    });
  } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Error fetching users');
  }
};

exports.addStaff= async(req,res)=>{
  try {
    // Destructure data from the form
    const { firstname, lastname, email, phone, dob, gender, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new staff record
    const newStaff = await User.create({
        firstname,
        lastname,
        email,
        phone,
        dob,
        gender,
        password: hashedPassword,
        role: 'Staff', 
        status: true, 
        isVerified: true 
    });

    // get new staff id
    const staffId = newStaff.id;

    // create staff username
    const username = firstname+'123'+staffId;

    // update new staff username
    await User.update({ username }, {
        where: {
            id: staffId
        }
    });

    // Send success response
    req.flash('message', 'Staff added successfully');
    req.flash('results', 'success');
    // Redirect to the staffs page
    return res.redirect('/Supervisor/Staffs');
} catch (error) {
// Send success response
req.flash('message', 'Error adding staff:'+error);
req.flash('results', 'error');
// Redirect to the staffs page
return res.redirect('/Supervisor/AddStaff');
}
};
