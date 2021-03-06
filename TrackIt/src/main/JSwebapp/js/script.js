window.addEventListener("load", function () {
  init();
});


//In an on load event lister, call a function 
//that executes an XMLHttpRequest to get all of your event objects.
function init() { // initializes lookup and create new cycle functions
  console.log("We are flowing!");

  document.cycleSearch.lookup.addEventListener("click", function (event) {
	event.preventDefault();
	
    var cycleId = document.cycleSearch.cycleId.value;
    if (!isNaN(cycleId) && cycleId > 0) {
	  getCycle(cycleId);
	  
    }
  });


  document.newCycle.addCycle.addEventListener('click', function(event){
	event.preventDefault();
	createCycleToTrack();
	
	
});

getAllList();

}

//********************CRUD********************** */
function createCycleToTrack(){
	
let newForm = document.newCycle;
let cycle = {};
cycle.name = newForm.name.value;
cycle.periodStart = newForm.periodStart.value;
cycle.periodDuration = newForm.periodDuration.value;
cycle.cycleLength = newForm.cycleLength.value;
cycle.volume = newForm.volume.value;
cycle.notes = newForm.notes.value;

let cycleJson = JSON.stringify(cycle); 
let xhr = new XMLHttpRequest();
let uri = 'api/cycles';

xhr.open('POST', uri);
	xhr.setRequestHeader('Content-type', 'application/json')
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 200 || xhr.status === 201){
				let createdCycle = JSON.parse(xhr.responseText);
				//displayCycle(createdCycle);
				getAllList();
			}
			else{
				if(xhr.status === 400){
					displayError(`Invalid cycle data, unable to create cycle form ${cycleJson}`);
				} else{
					displayError('Unknown error creating log.')
				}




			}
		}
};
xhr.send(cycleJson);
}

//******************* update methods: doesn't work yet********************* */

function retrieveUpdate(cycle){
var updateDiv = document.getElementById('cycleEddit');

let updateForm = document.createElement("form");
updateForm.setAttribute("name", "updateItForm");

let input1 = document.createElement("input");
input1.setAttribute("type", "hidden");
input1.setAttribute("name", "id");
input1.setAttribute("value", cycle.id);
updateForm.appendChild(input1);

let input2 = document.createElement("input");
input2.setAttribute("type", "text");
input2.setAttribute("name", "name");
input2.setAttribute("label", "Title");;
input2.setAttribute("value", "name");
input2.textContent = cycle.name;
updateForm.appendChild(input2);

let input3 = document.createElement("input");
input3.setAttribute("type", "text");
input3.setAttribute("name", "periodStart");
input3.setAttribute("value", "Period Start" );
input3.textContent = cycle.periodStart;
updateForm.appendChild(input3);

let input4 = document.createElement("input");
input4.setAttribute("type", "text");
input4.setAttribute("name", "periodDuration");
input4.setAttribute("value", "Duration");
input4.textContent = cycle.periodDuration;
updateForm.appendChild(input4);

let input5 = document.createElement("input");
input5.setAttribute("type", "text");
input5.setAttribute("name", "cycleLength");
input5.setAttribute("value", "Length");
input5.textContent = cycle.cycleLength;
updateForm.appendChild(input5);

let input6 = document.createElement("select");
input6.setAttribute("name", "volume")
let first = document.createElement("option");
let opt1 = document.createTextNode("Heavy");
first.appendChild(opt1);
first.setAttribute("value", "Heavy");
input6.appendChild(first);

let second = document.createElement("option");
let opt2 = document.createTextNode("Medium");
second.appendChild(opt2);
second.setAttribute("value", "Medium");
input6.appendChild(second);

let third = document.createElement("option");
let opt3 = document.createTextNode("Light");
third.appendChild(opt3);
third.setAttribute("value", "Light");
input6.appendChild(third);

input6.textContent = cycle.volume;
updateForm.appendChild(input6);

let input7 = document.createElement("input");
input7.setAttribute("type", "text");
input7.setAttribute("name", "notes");
input7.setAttribute("value", "notes");
input7.textContent = cycle.notes;
updateForm.appendChild(input7);

var input8 = document.createElement("input");
input8.setAttribute("type", "submit")
input8.setAttribute("name", "updateCycle");
input8.setAttribute("value", "Update It");
updateForm.appendChild(input8);


updateDiv.appendChild(updateForm);

var cycleToUpdate = {};
cycleToUpdate.id = updateForm.id.value;
cycleToUpdate.name = updateForm.name.value;
cycleToUpdate.periodStart = updateForm.periodStart.value;
cycleToUpdate.periodDuration = updateForm.periodDuration.value;
cycleToUpdate.cycleLength = updateForm.cycleLength.value;
cycleToUpdate.volume = updateForm.volume.value;
cycleToUpdate.notes = updateForm.notes.value;

document.updateItForm.updateCycle.addEventListener('click', function(event){
	event.preventDefault();
	doUpdateCycle(cycleToUpdate);
});


}


function doUpdateCycle(cycle){

	let idToUpdate = cycle.id;
	let xhr = new XMLHttpRequest();
	let uri = 'api/cycles/' + idToUpdate; 
	xhr.open('PUT', uri);
	   xhr.setRequestHeader('Content-type', 'application/json');
	   let justUpdateThisWouldYa = JSON.stringify(cycle);
	   xhr.onreadystatechange = function() {
		   if (xhr.readyState === 4) {
			   if (xhr.status < 300 ){
				let updatedCycle = xhr.responseText;
				getAllList();
			   }
			   else{
				   displayError('Error updating');
			   }
			}
		}

		xhr.send(justUpdateThisWouldYa);
}

//***************************************************************** */
function deleteCycle(cycle){

	let id = cycle.id;
	let xhr = new XMLHttpRequest();
	let uri = 'api/cycles/' + id; 
	xhr.open('DELETE', uri);
	   xhr.setRequestHeader('Content-type', 'application/json');
	   xhr.onreadystatechange = function() {
		   if (xhr.readyState === 4) {
			   if (xhr.status ==200 || xhr.status == 204){
				getAllList();
				var dataDiv = document.getElementById('cycleData');
	dataDiv.textContent = '';
			   } else {
				displayError('Error deleting: ' + xhr.status + ':' + xhr.responseText);

			   }
			}

	   };
	   xhr.send();

}


//************************************************* */
function getCycle(cycleId) {
	
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/cycles/' + cycleId);

	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 200){
				let dataJSON = xhr.responseText; 
				let data = JSON.parse(dataJSON); 
				console.log(data);
				displayCycle(data); // calls method below to actually display data
				
			}else {
				if (xhr.status === 404) {		
					let dataDiv = document.getElementById('cycleData');
					dataDiv.textContent = '';	
					displayError('Record not found');
				}
				else {
					displayError('Error retrieving cycle record ' + cycleId);
				}
		} 
		
	};
	
}
	xhr.send(null);
}


function displayCycle(cycle){ //method being called from getCycleById
	let ErrorDiv = document.getElementById('ErrorData');
					ErrorDiv.textContent = '';
	var dataDiv = document.getElementById('cycleData');
	dataDiv.textContent = '';

	let name = document.createElement("h1");
    name.textContent = 'Search Result: ' + cycle.name;
	  dataDiv.appendChild(name);
	  let notes = document.createElement('blockquote');
  
  notes.textContent = 'Notes: ' + cycle.notes;
  dataDiv.appendChild(notes);
	  let periodStart = document.createElement('blockquote');
  
	  periodStart.textContent = 'First date of Your last period: ' + cycle.periodStart;
  dataDiv.appendChild(periodStart);
	  let periodDuration = document.createElement('blockquote');
  
	  periodDuration.textContent = 'Period Duration(days): ' + cycle.periodDuration;
  dataDiv.appendChild(periodDuration);
	  let cycleLength = document.createElement('blockquote');
  
	  cycleLength.textContent = 'Cycle Length(days): ' + cycle.cycleLength;
  dataDiv.appendChild(cycleLength);
	  let volume = document.createElement('blockquote');
  
	  volume.textContent = 'Flow volume: ' + cycle.volume;
  dataDiv.appendChild(volume);

  let updateBtn = document.createElement('button');
  	updateBtn.name = 'updateBtn';
  	updateBtn.id = 'updateBtn';
	  updateBtn.textContent = 'UPDATE Cycle';
	  dataDiv.appendChild(updateBtn);
	  updateBtn.addEventListener('click', function(){
		retrieveUpdate(cycle);
			});

let deleteBtn = document.createElement('button');
			deleteBtn.name = 'deleteBtn';
			deleteBtn.id = 'deleteBtn';
			deleteBtn.textContent = 'DELETE';
			dataDiv.appendChild(deleteBtn);
			deleteBtn.addEventListener('click', function(){
						deleteCycle(cycle);
					});

}


function displayError(message){
	let div = document.getElementById('ErrorData');
	div.style.color = 'red';
	div.style.fontFamily = 'American Typewriter';
	div.textContent = message;

}


//******************   table  ********************* */

function getAllList(){

	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/cycles/');
	xhr.onreadystatechange = function(){
		if (xhr.readyState === 4){
			if (xhr.status === 200){
				let cycleJSON = xhr.responseText;
				let data = JSON.parse(cycleJSON);
				
				displayAll(data);	
			}
			else if (xhr.status === 404) {
				displayError('Invalid cycle log ' + cycleJSON);
			}
			else {
				displayError('error: ' + xhr.status)
			}
		}
		
	};
	xhr.send();
}


function displayAll(cycle) {

	let dataDiv = document.getElementById('cyclesList');
	dataDiv.textContent = '';
	
	let table = document.createElement('table');
	let tableHead = document.createElement('thead');
	let tRow = document.createElement('tr');
	let tableH = document.createElement('th')	
	tableH.textContent = 'ID';
	tRow.appendChild(tableH);
	th0 = document.createElement('th');
    th0.textContent = "Cycle Name";
    tRow.appendChild(th0);

	th1 = document.createElement('th');
	th1.textContent = 'Notes';
	tRow.appendChild(th1);
	th2 = document.createElement('th');
	th2.textContent = 'Start date';
	tRow.appendChild(th2);
	th3 = document.createElement('th');
	th3.textContent = 'Period Duration(days)';
	tRow.appendChild(th3);
	th4 = document.createElement('th');
	th4.textContent = 'Cycle Length(days)';
	tRow.appendChild(th4);
	th5 = document.createElement('th');
	th5.textContent = 'Flow volume';
	tRow.appendChild(th5);
	
	
	tableHead.appendChild(tRow);	
	table.appendChild(tableHead);


	let tableBody = document.createElement('tbody');
	cycle.forEach(element => {
		console.log(element);
		
		tr1 = document.createElement('tr');
		
		td0 = document.createElement('td')
		td0.textContent = element.id;
		tr1.appendChild(td0);

		td = document.createElement('td')
		td.textContent = element.name;
		tr1.appendChild(td);

		td1 = document.createElement('td')	
		td1.textContent = element.notes;
		tr1.appendChild(td1);

		td2 = document.createElement('td')	
		td2.textContent = element.periodStart;
		tr1.appendChild(td2);

		td3 = document.createElement('td')	
		td3.textContent = element.periodDuration;
		tr1.appendChild(td3);

		td4 = document.createElement('td')	
		td4.textContent = element.cycleLength;
		tr1.appendChild(td4);

		td5 = document.createElement('td')	
		td5.textContent = element.volume;
		tr1.appendChild(td5);
		
		tableBody.appendChild(tr1);

	             //Add Event Listener
	tr1.addEventListener('click', function(event){
		event.preventDefault();

		getCycle(element.id);
	});
	//**************************************** */
	});
	table.appendChild(tableBody);
	dataDiv.appendChild(table);
} 
