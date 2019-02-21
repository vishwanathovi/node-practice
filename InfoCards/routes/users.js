var express = require('express');
var router = express.Router();
var url = require('url');
var Cards = require('../models/Cards');
var Users = require('../models/Users');
var bcrypt = require('bcrypt');

// Display Login page
router.get('/login', function(req, res, next) {
	res.render('login');
});


// Disply Register page
router.get('/register', function(req, res, next) {
	res.render('register');
});

// Allow registration of an user
router.post('/register', function(req,res,next){
	Users.findOne({email:req.body.email},(err,user)=>{
		if(err) return res.send(err);
		if(user) return res.send('User already present');
		req.body.password = bcrypt.hashSync(req.body.password, 10);
		Users.create(req.body,(err)=>{console.log(err)})
		res.send('Registered succesfully!')
	})
}) 


// Allow Login of an user

router.post('/login', function(req,res,next){
	Users.findOne({email:req.body.email},(err,user)=>{
		if(err) return res.send(err);
		if(!user) return res.send('User not found!');
		if(user.comparePassword(req.body.password)){
			// Todo: Login the user
			req.session.username = user.username;
			req.session.userid = user.id;
			res.redirect('/cards')
		} else {
			res.send('Wrong Password!')
		}
	})
})

// Logout of user

router.get('/logout',function(req,res,next){
	console.log("hello")
	req.session.destroy();
	res.redirect('/cards');
})


// 

module.exports = router;
