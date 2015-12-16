var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');
    handlebar       = require('handlebars')
    html_dir = './html/';
    path = require("path");

// Connection to mongo DB
//mongoose.connect('mongodb://localhost/template', function(err, res) {
//  if(err) throw err;
//  console.log('Connected to Database');
//});

// Path for html files

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var models     = require('./models/pain')(app, mongoose);
var PainController = require('./controllers/pain');

// API router
var painScoreRouter = express.Router();
app.use(painScoreRouter);

painScoreRouter.get('/', function(req, res) {
  res.sendFile('public/html/main.html', { root: __dirname });
});

painScoreRouter.route('/painScores')
  .get(PainController.findAllPainScores)
  .post(PainController.addPainScore);

painScoreRouter.route('/delete')
  .post(PainController.deleteAll);

painScoreRouter.route('/painScores/:id')
  .get(PainController.findById)
  .put(PainController.updatePainScore);

app.get('/buscar', function(req, res) {
   res.send("Pati pati pati pati!");
});

app.get('/create', function(req, res) {
   res.sendFile(html_dir +'create.html', { root: __dirname });
});

app.get('/read', function(req, res) {
   res.sendFile(html_dir +'read.html', { root: __dirname });
});

app.get('/delete', function(req, res) {
   res.sendFile(html_dir +'delete.html', { root: __dirname });
});

app.get('/modify', function(req, res) {
   res.sendFile(html_dir +'modify.html', { root: __dirname });
});


app.use('/api', painScoreRouter);

// Start server
app.listen(process.env.PORT || 5000, function() {
  console.log("Node server running on http://localhost:18320");
});
