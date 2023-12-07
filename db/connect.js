const mysql = require('mysql2/promise')
require('dotenv').config({path:__dirname+'/../.env'}) // .env file is located in the parent folder

var db = mysql.createPool({
    host: process.env.DATABASE_HOST, 
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
})

module.exports = {db}