module.exports = {
	updateUsername: function (req,res,next){
		if (!req.session.username){
			res.locals.username = "Guest";
		} else {
			res.locals.username = req.session.username;
		}
		next();
	},
	isAuthor: function (req,res, card){
		if (req.session) return req.session.userid==card.author;
		return false;
	}

}