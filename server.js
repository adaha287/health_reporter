var express      = require('express');
var app          = express();
var path         = require('path');
var mongoose     = require('mongoose');
var bodyParser   = require('body-parser');
var Weight       = require('./backend/weightModel');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'frontend')));

var dbObject;
mongoose.connect('mongodb://localhost:27017/test',{useMongoClient: true}, function(err, db){
    if(err){
        console.log('Could not connect to database', err);
    }
    else{
        console.log('Successfully connected to MongoDB!');
        dbObject = db
    }
});

function getData(res){
	//use the find() API and pass an empty query object to retrieve all records
	dbObject.collection("weights").find({}).toArray(function(err, docs){
		if ( err ) throw err;
		var dateArray = [];
		var weights = [];
		for ( index in docs){
	    	var doc = docs[index];
			//category array
	        var day = JSON.stringify(doc['date']);
	        day = day.substr(1, 10);
	        dateArray.push(day);

	        var weight = doc['weight'];
	        weights.push(weight);
	    }
	     
	    var response = {
			"weights" : weights,
			"dates" : dateArray
	    };
	    res.json({success: true, data: response});
    });
}


app.post('/logweight', function(req, res){
    var object = new Weight();
    object.weight = req.body.weight;
    if(object.weight > 40.0 && object.weight < 90.0){
        object.save();
        res.json({success: true, message: 'Saved weight', weight: object.weight});
    }
    else{
        res.json({success: false, message: 'Weight not correctly entered, should be between 40 and 90 kilograms'});
    }
});



app.get("/weights", function(req, res){
	getData(res)
});


// Listen for requests
var custom_port = 4000;
var server = app.listen(process.env.PORT || custom_port, function() {
    port = server.address().port;
    console.log('Server is up and running on port',port);
});
