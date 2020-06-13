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

function getCycle(cycleId) {
	
	var xhr = new XMLHttpRequest();
	xhr.open('GET', `api/cycles/${cycleId}`);

	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 200){
				var dataJSON = xhr.responseText; 
				var data = JSON.parse(dataJSON); 
				console.log(data);
				displayCycle(data);
			}else {
				if (xhr.status === 404) {					
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


function displayCycle(cycle){
	console.log(cycle);
	let dataDiv = document.getElementById('cycleData');
	dataDiv.textContent = '';
	
	let name = document.createElement("h1");
    name.textContent = cycle.name;
	  dataDiv.appendChild(name);
	  let notes = document.createElement('blockquote');
  
  notes.textContent = cycle.notes;
  dataDiv.appendChild(notes);
	  let periodStart = document.createElement('blockquote');
  
	  periodStart.textContent = cycle.periodStart;
  dataDiv.appendChild(periodStart);
	  let periodDuration = document.createElement('blockquote');
  
	  periodDuration.textContent = cycle.periodDuration;
  dataDiv.appendChild(periodDuration);
	  let cycleLength = document.createElement('blockquote');
  
	  cycleLength.textContent = cycle.cycleLength;
  dataDiv.appendChild(cycleLength);
	  let volume = document.createElement('blockquote');
  
	  volume.textContent = cycle.volume;
  dataDiv.appendChild(volume);

  console.log(dataDiv);



}


function displayError(message){
	var div = document.getElementById('CycleData');
	div.textContent = message;

}