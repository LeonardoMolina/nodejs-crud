var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://localhost/tvshows', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var models     = require('./models/pain')(app, mongoose);
var PainController = require('./controllers/pain');


// API routes
var painScoreRouter = express.Router();

app.use(painScoreRouter);

painScoreRouter.route('/painScores')
  .get(PainController.findAllPainScores)
  .post(PainController.addPainScore);

painScoreRouter.route('/painScores/:id')
  .get(PainController.findById)
  .put(PainController.updatePainScore)

//app.use('/api', painScoreRouter);

// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
