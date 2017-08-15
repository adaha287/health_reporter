var express      = require('express');
var app          = express();
var path         = require('path');
var mongoose     = require('mongoose');
var bodyParser   = require('body-parser');
var router       = express.Router();
var appRoutes    = require('./backend/routes')(router);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/api', appRoutes);

app.use(express.static(path.join(__dirname, 'frontend')));


mongoose.connect('mongodb://localhost:27017', function(err){
    if(err){
        console.log('Could not connect to database', err);
    }
    else{
        console.log('Successfully connected to MongoDB!');
    }
});

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname + '/frontend/index.html'));
});
// Listen for requests
var custom_port = 4000;
var server = app.listen(process.env.PORT || custom_port, function() {
    port = server.address().port;
    console.log('Server is up and running on port',port);
});
