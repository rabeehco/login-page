const express = require('express')
const app = express()
const path = require('path')
const ejsMate = require('ejs-mate')

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/home', (req, res) => {
    res.send('Home Sweet Home')
})

app.get('/login', (req, res) => {
    res.render('users/login')
})

app.get('/register', (req, res) => {
    res.render('users/register')
})

app.listen(4000, () => {
    console.log('Serving Port 4000')
})
