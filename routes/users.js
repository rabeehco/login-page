const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../models/users') 

router.get('/register', (req, res) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
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
    req.flash('success', 'Successfully Registered An Account!')
    res.redirect('/login')
   } catch(e) {
     res.send(e.message)
   }
})

router.get('/login', (req, res) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  if(req.isAuthenticated()){
      res.redirect('/')  
  } else {
    res.render('users/login', {
      user: req.user
    })
  }
  
})
                                       
router.post('/login', passport.authenticate('local', {failureRedirect:'/login', failureFlash: true}), async(req, res) => {
  req.flash('success', 'Logged In Successfully')  
  res.redirect('/')
})

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if(err) {return next(err)}
    req.flash('success', 'Successfully Logged Out')
    res.redirect('/login')
  })
})

module.exports = router;