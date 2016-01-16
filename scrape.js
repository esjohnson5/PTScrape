
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
			var addressObj = buildAddObj(clinic_address,city);
			
			chrome.runtime.sendMessage(addressObj,function(response){	
				console.log(response.results);
				buildOutput(clinic_name,response.results,tbody.rows[0]);
			});

			
			//console.log(clinic_name);
			console.log(clinic_address);
			console.log(city);
		}
}

function buildAddObj(add,c){
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
	return address;
}

function buildOutput(name, response, element){
	var i = 0;
	var cell = element.insertCell(i);
	
	cell.innerHTML = "<div width='10%' class='outputtext'><p>" + name + "<br>" + address + "<br>" + city + "</p></div>";
}

function styles(){
	var style = document.createElement("style");
	var output = ".outputtext { font-family: Times; color: black; font-size: 11pt; padding: 2px 2px; text-align: center}";
	style.innerHTML = output;
	document.head.appendChild(style);
}
styles();
scrape();