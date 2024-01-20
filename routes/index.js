var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */

/**
 * Login route to authenticate user using passport js
 * saving session as way of login, to mantain user logged in thourghout state
 *
 * @type {Router}
 */
router.route('/')
    .get (function(req, res) {
      res.render('index', {title: 'Express'});
    })


    .post(function  (req, res) {
      let username = req.head;
      let password = req.body.no2;
      if (isNaN(username) || isNaN(password)) {
        res.setHeader('Content-Type', 'application/json');
        res.status(403).json({error: 403, reason: 'Username or Password are invalid'});
      } else {
        axios.post('http://localhost:3001/add',
            {username: username, password: password})
            .then(json =>
                res.json(json.data.result))
            .catch(err => {
              res.setHeader('Content-Type', 'application/json');
              res.status(505).json(err)
            })

      }
    });
  module.exports = router;

