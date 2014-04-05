// set up ========================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb

mongoose.connect('mongodb://db_user:d6_pw9@ds035907.mongolab.com:35907/gomodev_testdb'); 	// connect to mongoDB database on modulus.io

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    pwd: String
});

var User = mongoose.model('User', userSchema)
// configuration =================
app.configure(function() {
	console.log(__dirname);
	app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
	app.use(express.logger('dev')); 						// log every request to the console
	app.use(express.bodyParser()); 							// pull information from html in POST
	app.use(express.methodOverride()); 						// simulate DELETE and PUT
});

// get all users
app.get('/api/users', function(req, res) {
	// use mongoose to get all todos in the database
	User.find(function(err, users) {
    console.log("users: %j", users);
		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err)
			res.send(err)
		res.json(users); // return all users in JSON format
	});
});

app.post('/api/user/auth', function(req, res) {
	User.findOne({ name: req.body.name, pwd: req.body.pwd}, function (err, user) {
	    
	    if (err)
			res.send(err);
		if(user==null){
		    res.json({'error':'login error'});
		}else{
		    res.json(user); //return selected user
		}
	});
});

app.post('/api/users', function(req, res) {
	//User creation with data come from ajax angular client
	User.create({
			name : req.body.name,
			email : req.body.email,
			pwd : req.body.pwd,
			done : false
        }, 
        function(err, user) {
			if (err)
				res.send(err);

			//reload all users after create one
			User.find(function(err, users) {
				if (err)
					res.send(err)
				res.json(users);
			});
	    }
	);

});

app.delete('/api/users/:user_id', function(req,res){
    User.remove({
			_id : req.params.user_id
		}, function(err, user) {
			if (err)
				res.send(err);

			//reload all users after create one
			User.find(function(err, users) {
				if (err)
					res.send(err)
				res.json(users);
			});
		});
});
	
app.get('/', function(req, res) {
	res.sendfile('./public/index.html'); 
	// load the single view file 
});


// listen (start app with node server.js) ======================================
app.listen(process.env.PORT);
console.log("App listening on port "+process.env.PORT);
