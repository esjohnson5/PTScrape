chrome.runtime.onMessage.addListener(
	function(request,sender,sendResponse){
		//console.log(request.name);
		sendResponse(makeReq(request));
});

function makeReq(addObj){
	var city = addObj.city.replace(" ", "+");
	var info = addObj.num + "+" + addObj.street +"," + "+" +  addObj.city + "," + "+" + addObj.state;
	var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + info;
	var xhr = new XMLHttpRequest();
	xhr.open("GET",url,false);
	xhr.send();
	var response = xhr.responseText;
	var info = JSON.parse(response);
	return info;
}
