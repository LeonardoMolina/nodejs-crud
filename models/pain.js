exports = module.exports = function(app, mongoose) {
	var pain = new mongoose.Schema({
		name:		{ type: String },
		score: 		{ type: Number },
		comment:   	{ type: String },
	});
	mongoose.model('Pain', pain);
};
