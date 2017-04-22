//
// main
/// target
/// canon
/// ball
//
// functions
/// listeners
/// target
/// canon
/// ball
//
/// util func
function displayLegend () {
	log("Utiliser ");
	log("  les flèches gauche et droite pour déplacer le canon.");
	log("  et la barre d'espace pour tirer sur la cible verte.");
}
function log (o) {get("#info").innerHTML+=o+"<br/>";}
function get(s) {return document.querySelector(s);}
//function get2(id) {return document.getElementById(id);}