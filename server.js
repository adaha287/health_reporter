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
	console.log( "in get data")
	//use the find() API and pass an empty query object to retrieve all records
	dbObject.collection("weights").find({}).toArray(function(err, docs){
		if ( err ) throw err;
		var dateArray = [];
		var weights = [];
		for ( index in docs){
	    	var doc = docs[index];
			//category array
	        var day = doc['date'];
	        //series 1 values array
	        var weight = doc['weight'];
	        monthArray.push({"label": day});
	        weights.push({"value" : weight});
	    }
	     
	    var dataset = [
	      {
	        "seriesname" : "My weight changes",
	        "data" : weights
	      }
	    ];
	     
	    var response = {
	      "dataset" : dataset,
	      "categories" : dateArray
	    };
    });
	res.json({success: true, data: response});
}


app.post('/logweight', function(req, res){
	console.log("In post/logweight!!");
    var object = new Weight();
    object.weight = req.body.weight;
    console.log("Weight is:", object.weight);
    console.log("Type is:", typeof(object.weight))
    if(object.weight > 40.0 && object.weight < 90.0){
    	console.log("Correct value, saving");
        object.save();
        res.json({success: true, message: 'Saved weight', weight: object.weight});
    }
    else{
    	console.log("Not correct value!");
        res.json({success: false, message: 'Weight not correctly entered, should be between 40 and 90 kilograms'});
    }
});



app.get("/weights", function(req, res){
	console.log("/weights requested!!!!");
	getData(res)
});


// Listen for requests
var custom_port = 4000;
var server = app.listen(process.env.PORT || custom_port, function() {
    port = server.address().port;
    console.log('Server is up and running on port',port);
});
