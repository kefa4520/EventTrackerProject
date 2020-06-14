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
				displayCycle(createdCycle);
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

 


}


function displayError(message){
	let div = document.getElementById('ErrorData');
	div.style.color = 'red';
	div.style.fontFamily = 'American Typewriter';
	div.textContent = message;

}


//************************************************** */

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
	tableH.textContent = 'Cycle Name';
	tRow.appendChild(tableH);
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

		
		// td8 = document.createElement('td')	
		// 	let updateBtn = document.createElement('button');
		// 	updateBtn.name = 'updateBtn';
		// 	updateBtn.id = 'updateBtn';
		// 	updateBtn.textContent = 'UPDATE';
		// 	td8.appendChild(updateBtn);
		// 	updateBtn.addEventListener('click', function(){
		// 		showWateringUpdateForm(element);
		// 	});
		// tr1.appendChild(td8);
		// td9 = document.createElement('td')	
		// 	let deleteBtn = document.createElement('button');
		// 	deleteBtn.name = 'deleteBtn';
		// 	deleteBtn.id = 'deleteBtn';
		// 	deleteBtn.textContent = 'DELETE';
		// 	td9.appendChild(deleteBtn);
		// 	deleteBtn.addEventListener('click', function(){
		// 		deleteWatering(element.id);
			// });
		// tr1.appendChild(td9);
		tableBody.appendChild(tr1);

		//**************************************** */
	//Add Event Listener
	tr1.addEventListener('click', function(event){
		event.preventDefault();
		this.style.backgroundColor = "salmon";
		getCycle(element.id);
	});
	//**************************************** */
	});
	table.appendChild(tableBody);
	dataDiv.appendChild(table);
}
