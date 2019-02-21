var express = require('express');
var router = express.Router();
var Cards = require('../models/Cards')

/* GET home page. & Display users */
router.get('/', function(req, res, next) {
  res.redirect('/cards');
});

module.exports = router;
