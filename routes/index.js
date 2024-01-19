var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * Login route to authenticate user using passport js
 * saving session as way of login, to mantain user logged in thourghout state
 *
 * @type {Router}
 */
router.get('/login', (req,res) => {
  res.render('login');
})

router.post('/login',passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));
  module.exports = router;

