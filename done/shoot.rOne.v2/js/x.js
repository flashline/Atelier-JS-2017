// main

	var targetIdInterval=window.setInterval(targetRefresh,100);	
	targetRefresh ();	
	var i=0;
/// Target func
function targetRefresh () {
	i++;
	var x=Math.floor(Math.random() * 11  + 10);
	if (x>20) log("x="+x);
	if (i>=500) {
		window.clearInterval(targetIdInterval);
		log("end");
	}
}

function log (o) {$("info").innerHTML+=o+"<br/>";}
function $(s) {return document.getElementById(s);}


