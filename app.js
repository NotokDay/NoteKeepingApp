const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");

const authRoute = require('./routes/auth.route')
const mainRoute = require('./routes/index.route')
const adminRoute = require('./routes/admin.route')


const PORT = 3000
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true,}))
app.use(cookieParser());

app.use('/', mainRoute)
app.use('/users', authRoute)
app.use('/admin', adminRoute)

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


app.get('*', (request, response) => {
    return response.status(404).send("404 - Page Not Found")
})

app.listen(PORT, () => {
    console.log(`Running on port http://localhost:${PORT}.`)
})