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