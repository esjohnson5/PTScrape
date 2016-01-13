
function scrape(){
		var erase = document.getElementsByTagName('tbody')[2];
		erase.innerHTML = " ";
		var results = document.getElementsByClassName('searchresults')[0];
		var tbody = results.getElementsByTagName('tbody')[0];
		var row_no = tbody.rows.length;
		for (var i=3; i<row_no; i=i+2){
			var info = tbody.rows[i];
			var address_element = info.cells[0];
			var clinic_name = address_element.getElementsByTagName('b')[0].innerText;
			var clinic_address = address_element.getElementsByTagName('p')[0].innerText;
			var city_element = info.cells[1];
			var city = city_element.innerHTML;
			buildOutput(clinic_name,clinic_address,city,tbody.rows[0]);
			//console.log(clinic_name);
			//console.log(clinic_address);
			//console.log(city);
		}

}

function buildOutput(name, address, city, element){
	var i = 0;
	var cell = element.insertCell(i);
	cell.innerHTML = "<div width='10%'><p>" + name + "<br>" + address + "<br>" + city + "</p></div>";
}
scrape();