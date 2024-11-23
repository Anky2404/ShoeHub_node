const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');  

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
        
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
            notNull: { msg: 'Firstname is required' },
            notEmpty: { msg: 'Firstname cannot be empty' }
        }
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
            notNull: { msg: 'Lastname is required' },
            notEmpty: { msg: 'Lastname cannot be empty' }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { msg: 'Please enter a valid email address' },
            notNull: { msg: 'Email is required' },
            notEmpty: { msg: 'Email cannot be empty' }
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            // Ensure the phone number is exactly 10 digits
            is: {
                args: [/^\d{10}$/],
                msg: 'Please enter a valid 10-digit phone number'
            },
            notNull: { msg: 'Phone number is required' },
            notEmpty: { msg: 'Phone number cannot be empty' }
        }
    },
    dob: {
        type: DataTypes.DATE,  
        allowNull: false, 
        validate: {
            isDate: { msg: 'Please provide a valid date for Date of Birth' }
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Password is required' },
            notEmpty: { msg: 'Password cannot be empty' }
        }
    },
    role: {
        type: DataTypes.ENUM,
        values: ['Customer', 'Admin', 'Staff', 'Manager'],
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM,
        values: ['Male', 'Female'],
        allowNull: false
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    status:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: true,  
    tableName: 'users' 
});

// Instance method to compare passwords 
User.prototype.validPassword = function(password) {
    return this.password === password;  
};

module.exports = User;
