const express = require('express')
const router = express.Router()

const { 
    checkAccessToken 
} = require('../middleware/authChecker')

const { 
    getNotes,
    getNote,
    updateNote,
    getUpdatePage,
    deleteNote,
    createNote,
    getNewNotePage
} = require('../controllers/notes')


//index page is located under /dashboard
router.get('/', (request, response) => {
    response.redirect('/notes');
});

router.route('/notes').get(checkAccessToken, getNotes)

router.route('/notes/new').get(checkAccessToken, getNewNotePage).post(checkAccessToken, createNote)

router.route('/notes/:id').get(checkAccessToken, getNote)

router.route('/notes/edit/:id').get(checkAccessToken, getUpdatePage).post(checkAccessToken, updateNote)

router.route('/notes/delete/:id').get(checkAccessToken, deleteNote)

module.exports = router;