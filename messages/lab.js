var request = new XMLHttpRequest();
var textarray = "";

function parse() {
	request.open("GET", 'data.json', true);
	request.send(null);


	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
      	 	textarray = JSON.parse(request.responseText);
			displayMessages(textarray);
    	}
	}
}


function displayMessages(arr) {
	var output = "";
	var i;
	for (i = 0; i < arr.length; i++) {
		output += 
		"<div class='messages'> <p class='author'>" + 
				arr[i].username + 
			"</p> <p class='message'>" + 
				arr[i].content + 
			"</p> </div>"
	}
	messagedisplay = document.getElementById("messages");
	messagedisplay.innerHTML = output;

}
