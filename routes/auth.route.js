const express = require('express');
const router = express.Router();
const {
    registerUser, 
    getRegisterPage,

    getSigninPage,
    signinUser,

    logoutUser
} = require('../controllers/auth');


router.route('/register')
    .get(getRegisterPage)
    .post(registerUser)


router.route('/signin')
    .get(getSigninPage)
    .post(signinUser)

router.route('/logout')
    .get(logoutUser)

module.exports = router;