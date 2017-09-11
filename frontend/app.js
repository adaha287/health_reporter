var labels = [];
var weights = [];
var chart;
var ctx = document.getElementById('myChart').getContext('2d');
var ipAddress = "192.168.1.11";
var body = document.getElementsByTagName("BODY")[0];
body.onload = function(){
	loadWeights();
}

function httpGetAsync(theUrl, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

//Save weight records in an array
function storeResponse(response){
	if(response !== undefined && response !== ""){
		var obj = JSON.parse(response)
		weights = obj.data.weights
		labels = obj.data.dates
		createNewChart()
	}
}

//Get weights from server
function loadWeights(){
	httpGetAsync("http://"+ipAddress+":4000/weights", storeResponse);
}

//Send a weight to store in the database
function sendWeight(){
	var http = new XMLHttpRequest();
	var url = "http://"+ipAddress+":4000/logweight";
	var w = document.getElementById("weight").value
	var params = JSON.stringify({"weight": Number(w)});
	http.open("POST", url, true);

	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/json");

	http.onreadystatechange = function() {//Call a function when the state changes.
	    if(http.readyState == 4 && http.status == 200) {
			console.log("Weight was sent!");
			loadWeights();
		}
	}
	http.send(params);
}

function createNewChart(){
	if (typeof chart !== 'undefined') {
		chart.destroy()
	}
	ctx = document.getElementById('myChart').getContext('2d');
	chart = new Chart(ctx, {
	// The type of chart we want to create
	type: 'line',

	// The data for our dataset
    data: {
        labels: labels,
        datasets: [{
            label: "My weight",
            backgroundColor: 'rgb(0, 255, 132)',
            borderColor: 'rgb(0, 0, 0)',
            data: weights,
            steppedLine: true
        }]
    },

    // Configuration options go here
    options: {
    	scales: {
            yAxes: [{
                ticks: {
                    min: 60,
                    max: 67,
                    stepSize: 0.2
                }
            }]
        }
    }
	});
}
