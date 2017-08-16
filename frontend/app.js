var labels = [];
var weights = [];

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function saveWeights(response){
	labels = [];
	weights = [];
	for (entries in response.body.result){
		labels.append(entries.date)
		weights.append(entries.weight)
	}
}

function loadWeights(){
	httpGetAsync("http://localhost:4000/weights", saveWeights)
}

function sendWeight(){
	var http = new XMLHttpRequest();
	var url = "http://localhost:4000/logweight";
	var w = document.getElementById("weight").value
	console.log("sending value:", w)
	var params = JSON.stringify({"weight": Number(w)});
	http.open("POST", url, true);

	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/json");

	http.onreadystatechange = function() {//Call a function when the state changes.
	    if(http.readyState == 4 && http.status == 200) {
			console.log("Weight was sent!");
		}
	}
	http.send(params);
}