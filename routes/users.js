const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../models/users') 

router.get('/register', (req, res) => {
  if(req.isAuthenticated()){
    res.redirect('/')
  } else {
    res.render('users/register', {
      user: req.user
    })
  }
  
})

router.post('/register', async(req, res) => {
   try{
    const {email, username, password} = req.body
    const user = new User({email, username})
    const registeredUser = await User.register(user, password)
    res.redirect('/login')
   } catch(e) {
     res.send(e.message)
   }
})

router.get('/login', (req, res) => {
  if(req.isAuthenticated()){
      res.redirect('/')  
  } else {
    res.render('users/login', {
      user: req.user
    })
  }
  
})
                                      /* {failureRedirect:'/register'} */
router.post('/login', passport.authenticate('local', ), async(req, res) => {
  if(failureRedirect){
    res.send('failed the loging process')
  } else {
    res.redirect('/home')
  }  
  
    
})

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if(err) {return next(err)}
    res.redirect('/login')
  })
})

module.exports = router;