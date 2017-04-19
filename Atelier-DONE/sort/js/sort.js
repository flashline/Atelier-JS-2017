// main prog init
var MAX_LEN=20; 
var MAX_NUM=10;
var MIN_NUM=1;

var unsorted=[];
for (i = 0; i < MAX_LEN; i++) { 
   unsorted.push(Math.floor(Math.random() * MAX_NUM + MIN_NUM));
}
displayUnsorted ();
var sorted=[]; 
for (var i = 0; i < unsorted.length ; i++) { 
  var curr=unsorted[i];
  if (sorted.length==0) {
	  sorted.push(curr);
	  displaySorted ();
  }
  else {
	  var match=false;	 
	  Loop2:
	  for (var j = 0; j < sorted.length ; j++) { 
		  if (curr<sorted[j]) {
			  match=true;
			  insert(curr,j);			  
			  break Loop2;
		  }
		 
	  }	 
	  if (!match) {
		  sorted.push(curr) ;
		  displaySorted ();
	  }
  }
}
// displaySorted ();

// functions
function displaySorted () {
	log("---------------- Triés : "); 
	for (i = 0; i < sorted.length ; i++) { 
		log(sorted[i]);
	}
}
function displayUnsorted () {
	log(name+"---------------- NON triés : "); 
	for (i = 0; i < unsorted.length ; i++) { 
		log(unsorted[i]);
	}
}	
function insert (curr,j) {
	 sorted.splice(j, 0,curr);
	 displaySorted ();
}
function log (o) {
	get("#info").innerHTML+=o+"<br/>";
}
function get (s) {
	return document.querySelectorAll(s)[0];	
}



