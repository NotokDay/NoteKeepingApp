const express = require('express');
const router = express.Router();

const {
    getAdminPanel,
    upgradeToAdmin,
    deleteUser
} = require('../controllers/admin');

const { 
    checkAccessToken, 
    checkIfAdmin
} = require('../middleware/authChecker')


//starts with /admin
router.route('/')
    .get(checkAccessToken, checkIfAdmin, getAdminPanel)

router.route('/upgrade/:id')
    .get(checkAccessToken, checkIfAdmin, upgradeToAdmin)

router.route('/delete/:id')
    .get(checkAccessToken, checkIfAdmin, deleteUser)


module.exports = router