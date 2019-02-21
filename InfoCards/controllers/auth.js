module.exports = {
	updateUsername: function (req,res,next){
		if (!req.session.username){
			res.locals.username = "Guest";
		} else {
			res.locals.username = req.session.username;
		}
		next();
	}
}