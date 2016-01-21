
function scrape(){
		var erase = document.getElementsByTagName('tbody')[2];
		erase.innerHTML = " ";
		var results = document.getElementsByClassName('searchresults')[0];
		var tbody = results.getElementsByTagName('tbody')[0];
		var row_no = tbody.rows.length;

		var header = tbody.rows[0].getElementsByTagName('th');
			header[0].innerHTML = " ";
			header[1].innerHTML = " ";
			header[2].innerHTML = " ";
		
		for (var i=3; i<row_no; i=i+2){
			var info = tbody.rows[i];
			var address_element = info.cells[0];
			var clinic_name = address_element.getElementsByTagName('b')[0].innerText;
			var clinic_address = address_element.getElementsByTagName('p')[0].innerText;
			var city_element = info.cells[1];
			var city = city_element.innerHTML;
			var addressObj = buildAddObj(clinic_address,city,clinic_name,tbody);
			
			
			
			//console.log(clinic_name);
			console.log(clinic_address);
			console.log(city);
		}
}

function buildAddObj(add,c,doctor,element){
	var tmp = add.split("\n");
	var city = c.split(",")[0];
	var state = c.split(",")[1];
	var name,num;
	var street = " ";
	for(var i=0; i<tmp.length; i++){
		if (isNaN(tmp[i].charAt(0))){
			name = tmp[i];
		}else{
			var tmp2 = tmp[i].split(" ");
			num = tmp2[0];
			for(var j=1; j<tmp2.length; j++){
				street = street + tmp2[j] + "+";
			}
		}		
	}
	var address = {
		name: name,
		num: num,
		street: street, 
		city: city,
		state: state
	};
	chrome.runtime.sendMessage(address,function(response){	
				//console.log(response.results);
				//var rsp = response.results;
			if(response.status = "OK"){
				buildOutput(doctor,name,response.results,element);	
			}
			if(response.status = "ZERO_RESULTS")
			{
				console.log("no address found");	
			}
	});
}

function buildOutput(doctor, clinic, response, element){
	var i = 1;
	var row = element.insertRow(i);
	//var node = document.createElement("ul");
	//node.setAttribute('id','address-list');
	//var item = document.createElement("li");
	//item.setAttribute('class','outputtext');
	var address = response[0].address_components[0].long_name + " " + response[0].address_components[1].long_name;
	var city = response[0].address_components[3].long_name;
	var state = response[0].address_components[5].short_name;
	var zip = response[0].address_components[7].long_name;
	//var text = doctor + "<br>" + address + "<br>" + city + "," +  state + "<br>" + zip;
	row.innerHTML = "<tr><td class='outputtext'><p>" + doctor + "<br>" + address + "<br>" + city + "," +  state + "<br>" + zip + "</p></td></tr>";	
	//var cell = row.insertCell(1);
	//cell.innerHTML = "<button id='copyBtn'>Copy!</button>"
	
	//document.getElementById('copyBtn').addEventListener("click", function() {
	//	copyTo(row.innerText);
	//});
	
	i++;
	//item.appendChild(text);
	//node.appendChild(item);
	//cell.appendChild(node);
}

//function copyTo(text){
	//alert(text);
//}

function styles(){
	var style = document.createElement("style");
	var output = ".outputtext p { font-family: Times New Roman; color: black; font-size: 11pt; padding: 2px 2px; text-align: left}";
	style.innerHTML = output;
	document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded',scrape(),false);
styles();