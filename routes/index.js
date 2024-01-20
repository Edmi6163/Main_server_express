var express = require('express');
var router = express.Router();
const passport = require('passport');
const axios = require('axios');
const controller = require("../controllers/singUp");

/* GET home page. */

/**
 * @swagger
 * tags:
 *  name: Authentication
 *    descriptionLogin route to authenticate user using passport js inserting in mongodb credentials
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

router.post('/insert', async (req,res) => {
  try {
    const results = await controller.insert(req.body);
    res.json(results)
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

  module.exports = router;


