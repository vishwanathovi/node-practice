var express = require('express');
var router = express.Router();
var url = require('url');
var Cards = require('../models/Cards');
var Users = require('../models/Users');
var Category = require('../models/Category');
var Subcategory = require('../models/Subcategory');



// Display Cards
router.get('/', function(req, res, next) {

	// Creating a categoryTree
	// var CategoryTree = {};
	// Category.find({}).populate('subcategory','title').exec((err,categories)=>{
	// 	// console.log(category[0])
	// 	categories.forEach(category=>{
	// 		CategoryTree[category.title]=[];
	// 		category.subcategory.forEach(subcat=>CategoryTree[category.title].push(subcat))
	// 	})

	// 	console.log(CategoryTree)
	// })


	Cards.find({},(err,list)=>{
	  	if (err){
	  		console.log("Cards list fetch failed!");
	  		res.end();
	  	} 
		res.render('index', { cardsList: list});
		console.log("Cards fetch success!")
	})

	
});

// Handle add in the cards page

router.get('/add',function(req,res,next){
	res.render('add',{})
})

router.post('/add/new',function(req,res,next){
	req.body.tags = req.body.tags.split(',');
	req.body.author = req.session.userid || 'sampleID';
	Subcategory.findOne({title:req.body.subcategory},(err,subcat)=>{
		req.body.subcategory = subcat.id;
		
		Cards.create(req.body, (err,card)=>{
			if(err) return console.log(err)
			Users.findOneAndUpdate({_id:card.author},{$push:{cards: card.id}}, (err,user)=>{
				console.log(err)
			})

			Subcategory.findOneAndUpdate({_id: subcat.id}, {$push: {cards: card.id}}, (err,subcat2)=>{
				console.log(err)
			})
		})

	})
	
	res.redirect('/cards');
})


// Handle card click -> to new page
router.get('/:id',function(req,res,next){
	Cards.findById(req.params.id, function (err, card) {
		if(err){ 
			console.log(err);
			res.end();
		} else {
			res.render('card',{'card':card})
		}
	});
	
})


// Handle edit on the new page
router.get('/:id/edit/', function(req, res, next) {
  Cards.findById(req.params.id,(err,card)=>{
  	if (err){
  		console.log("Card list fetch failed!");
  	} 
  		console.log(card)
	  res.render('edit', {card: card });
		console.log("Data updated")
  	})
	// res.redirect('/cards');
});


// Complete edit
router.post('/:id/editComplete', function(req, res, next) {
	req.body.tags = req.body.tags.split(',');
	Cards.findOneAndUpdate({ _id: req.params.id }, req.body,(err)=>{console.log(err)})
	res.redirect('/cards');
})

// handle delete on new page
router.get('/:id/delete/', function(req, res, next) {
	Cards.findOneAndRemove({ _id: req.params.id }, (err, card)=>{
		if(err) return console.log(err)
		Users.findOneAndUpdate({_id:card.author},{$pull:{cards: card.id}}, (err,user)=>{
			console.log(err)
		})
	})
	res.redirect('/cards');
});


module.exports = router;
