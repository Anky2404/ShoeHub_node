
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Sequelize instance and connect to MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME,    // Database name
  process.env.DB_USER,    // Username
  process.env.DB_PASSWORD,// Password
  {
    host: process.env.DB_HOST,  // Host
    dialect: 'mysql',           // Database type
    logging: false,             // Disable SQL query logging
    define: {
      freezeTableName: true    // Don't pluralize table names
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Test the database connection
sequelize.authenticate()
  .then(() => console.log('Database connection established successfully'))
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  });

module.exports = sequelize;
