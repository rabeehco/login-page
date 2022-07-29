const express = require('express')
const app = express()
const path = require('path')
const ejsMate = require('ejs-mate')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')

const User = require('./models/users')
const userRoutes = require('./routes/users')

mongoose.connect('mongodb://127.0.0.1:/bionet')
.then(() => {
    console.log('DB Connected!')
})

app.engine('ejs', ejsMate) /* For adding layout/boilerplate */
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(__dirname + '/public')); /* for adding css file */
app.use(express.urlencoded({extended: true})) 

const sessionConfig = {
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }    
}
app.use(session(sessionConfig)) 

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    // res.locals.currentUser = req.user
    next()
})

app.get('/', (req, res) => {
    res.render('home', {
        user: req.user
    })
})

app.get('/home', (req, res) => {
    if(req.isAuthenticated()){
        res.redirect('/')
    } else {
        res.send('Please Login')
    }
    
})

app.use('/', userRoutes)

app.listen(4000, () => {
    console.log('Serving Port 4000')
})
