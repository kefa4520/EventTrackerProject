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
// getAll();

  document.newCycle.addCycle.addEventListener('click', function(event){
	event.preventDefault();
	createCycleToTrack();
	
	 
	 
 });


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