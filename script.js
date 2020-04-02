function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("countries_stat");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }

function rapidapicredit() {
  window.location.assign("https://rapidapi.com/astsiatsko/api/coronavirus-monitor");
}
function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("countries_stat");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      //check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}


var total_recovered = document.getElementById('total_recovered');
var total_death = document.getElementById('total_death');
var total_cases = document.getElementById('total_cases');
var new_cases = document.getElementById('new_case');
var new_death = document.getElementById('new_death');
var table = document.getElementById('countries_stat');


fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
		"x-rapidapi-key": "8ca5dbd881msh6ff46780657753bp16712ajsn7d89f4904385"
	}
})
.then(response => response.json().then(data =>{
    console.log(data);
    total_recovered.innerHTML = data.total_recovered;
    total_death.innerHTML = data.total_deaths;
    total_cases.innerHTML = data.total_cases;
    new_cases.innerHTML = data.new_cases;
    new_death.innerHTML = data.new_deaths;
}))
.catch(err => {
	console.log(err);
});

fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
		"x-rapidapi-key": "8ca5dbd881msh6ff46780657753bp16712ajsn7d89f4904385"
	}
})
.then(response => response.json().then(data =>{
    console.log(data);
    var countries_stat = data.countries_stat;
    console.log(countries_stat);
    for(let x = 0;x < countries_stat.length; x++){
        console.log(countries_stat[x]);
        let row = table.insertRow(x + 1);
        let country_name = row.insertCell(0);
        let cases = row.insertCell(1);
        let deaths = row.insertCell(2);
        let serious_critical = row.insertCell(3);
        let recoverd_per_country = row.insertCell(4);
        country_name.innerHTML = countries_stat[x].country_name;
        cases.innerHTML = countries_stat[x].cases;
        deaths.innerHTML = countries_stat[x].deaths;
        serious_critical.innerHTML = countries_stat[x].serious_critical;
        recoverd_per_country.innerHTML = countries_stat[x].total_recovered;
    }
}))
.catch(err => {
	console.log(err);
});