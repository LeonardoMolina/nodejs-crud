//File: controllers/tvshows.js
var mongoose = require('mongoose');
var empleados  = mongoose.model('Pain');

//GET - Return all pain scores in the the DB
exports.findAllPainScores = function(req, res) {
    empleados.find(function(err, pain) {
        if(err) res.send(500, err.message);
        console.log('GET /painScores')
  	res.status(200).jsonp(pain);
    });
};

//GET - Return a pain score for specified ID
exports.findById = function(req, res) {
	empleados.findById(req.params.id, function(err, pain) {
    if(err) return res.send(500, err.message);

    console.log('GET /painScore/' + req.params.id);
		res.status(200).jsonp(pain);
	});
};

//POST - Insert a new pain score in the DB
exports.addPainScore = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var painScore = new empleados({
		name:     req.body.name,
		score: 	  req.body.score,
		comment:  req.body.comment,
	});

	painScore.save(function(err, pain) {
		if(err) return res.send(500, err.message);
        res.status(200).jsonp(pain);
	});
};

//PUT - Update a an existing score
exports.updatePainScore = function(req, res) {
	empleados.findById(req.params.id, function(err, pain) {
		pain.name    = req.body.name;
		pain.score   = req.body.score;
		pain.comment = req.body.comment

		pain.save(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200).jsonp(pain);
		});
	});
};

