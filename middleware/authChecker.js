const jwt = require('jsonwebtoken')


const checkAccessToken = (req, res, next) => {
    var accessToken = req.cookies.accessToken

    if(!accessToken) return res.redirect('/users/signin')

    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.redirect('/users/signin')
        req.user = user
        next()
    })
    
}

const checkIfAdmin = async (req, res, next) => {
    //get user from the previous middleware
    user = req.user

    if(!user.isAdmin)
        return res.render("forbidden.ejs", {status:"error", message:"Access denied"})

    next()
}

module.exports = {checkAccessToken, checkIfAdmin}