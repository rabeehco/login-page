const express = require('express')
const app = express()
const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/home', (req, res) => {
    res.send('Home Sweet Home')
})

app.listen(3000, () => {
    console.log('Serving Port 3000')
})
