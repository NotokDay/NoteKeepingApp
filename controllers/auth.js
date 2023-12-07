const { db } = require('../db/connect')
const bcrypt = require('bcrypt')
require('dotenv/config');
const jwt = require('jsonwebtoken')

const hashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

const checkPasswordHash = function(password, hashedPassword){
    return bcrypt.compareSync(password, hashedPassword);
} 

const generateToken = function(id, firstname, lastname, isAdmin){
    return jwt.sign({ id, firstname, lastname, isAdmin }, process.env.JWT_SECRET, { expiresIn: '1d'});
}

const getRegisterPage = (request, response) => {
    return response.status(200).render('register.ejs', {status: "success", message: "Please fill the form"})
}

const registerUser = async (request, response) => {
    const { 
        firstname, 
        lastname, 
        email, 
        password, 
        confirmPassword 
    } = request.body;
    
    if(!firstname || !lastname || !email || !password || !confirmPassword)
        return response.render('register.ejs', { status: "error", message: 'Some fields are missing' });
    
    if(password !== confirmPassword)
        return response.render('register.ejs', {status: "error", message: 'Passwords do not match' });
    try {
        let [usersByEmail, _] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if(usersByEmail.length > 0) 
            return response.render('register.ejs', { status: "error", message: "Email is already registered" });

        let [insertResult, __] = await db.query('INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)', [firstname, lastname, email, hashPassword(password)]);
        if (insertResult.affectedRows === 1)
            return response.render('register.ejs', { status: "success", message: "User created successfully" });

        return response.render('register.ejs', { status: "error", message: "Something went wrong" });

    } catch (error) {
        console.error('Error executing query:', error);
        response.status(500).render('register.ejs', {status: "error", message: "Something went wrong" });
    }
};



const getSigninPage = (request,response) => {
    return response.status(200).render('login.ejs', {status:"success", message:"Please enter your credentials."})
}

const signinUser = async (request, response) => {
    const { 
        email, 
        password
    } = request.body;
    
    if(!email || !password)
        return response.render('login.ejs', { status: "error", message: 'Some fields are missing' });
    

    try {
        let [user, _] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if(user.length < 1) //user does not exist 
            return response.render('login.ejs', { status: "error", message: "Invalid Credentials" });

        //check if the password is correct
        if (checkPasswordHash(password, user[0].password)) {
            const accessToken = generateToken(user[0].id, user[0].firstname, user[0].lastname, user[0].isadmin);
            return response.cookie('accessToken', accessToken).redirect('/')
        }
        return response.status(401).render('login.ejs',{status:"error", message: "Invalid Credentials"})
    } catch (error) {
        console.error('Error executing query:', error);
        response.status(500).render('login.ejs', {status: "error", message: "Something went wrong" });
    }
};

const logoutUser = async (request, response) => {
    response.clearCookie("accessToken").render('login.ejs', {status:"success", message:"Logged out successfully."});
}

module.exports = {
    getRegisterPage,
    getSigninPage,

    registerUser, 
    signinUser,

    logoutUser
}