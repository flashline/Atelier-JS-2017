// main
var CANON_STEP=6 ; var CANON_BALL_SPEED=10;
/// Target
var targetElem=get("#target");
window.setInterval(targetRefresh,5000);	
targetRefresh ();	
/// Canon
var canonElem=get("#canon");	
var canonX=285;
var canonY=315;
/// Ball
var ballProtoElem=get("#ballProto");
var nextBallNum=0;
/// Listeners adding
document.addEventListener("keydown",onKeyDown);
displayLegend();
//
// functions
/// listeners
function onKeyDown (e) {	
	//left
	if (e.keyCode==37 && canonX>0) {
		canonMove(-CANON_STEP);
	}
	//right
	else if (e.keyCode==39 && canonX<600-30) {
		canonMove(+CANON_STEP);
	}	
	else if (e.keyCode==32 || e.keyCode==38 ) {
		ballShoot(); 
	}
}
/// Target func
function targetRefresh () {
	var x=Math.floor(Math.random() * (600-20) );
	var y=Math.floor(Math.random() * 200 );
	targetElem.style.left=x+"px";
	targetElem.style.top=y+"px";
};
/// Canon func
/**
 * move left and right the canon
 * @param step pixels number of one step
 */
function canonMove (step) {	
	canonX+=step;
	canonRefresh ();
}
function canonRefresh () {	
	canonElem.style.left=canonX+"px";
}
/// Ball func
function ballShoot () {	
	nextBallNum++;
	var ball={};
	ball.elem=ballProtoElem.cloneNode();
	ball.elem.id="ball_"+nextBallNum;
	ball.x=canonX-5; ball.y=canonY;
	get("#main").appendChild(ball.elem);
	ballMove(ball);
};
function ballMove(ball) { 	
	ball.y-=CANON_BALL_SPEED ;
	ballRefresh(ball);
	if (ball.y>-30) {
		var loop=function () { ballMove(ball); }
		window.requestAnimationFrame(loop);
	}
	else get("#main").removeChild(ball.elem);
}
function ballRefresh (ball) {
	ball.elem.style.left=ball.x+"px";
	ball.elem.style.top =ball.y+"px";
	//ball.elem.style.top =parseFloat(ball.elem.style.top)+CANON_BALL_SPEED+"px";	
};

/// util func
function displayLegend () {
	log("Utiliser ");
	log("  les flèches gauche et droite pour déplacer le canon.");
	log("  et la barre d'espace pour tirer sur la cible verte.");
}
function log (o) {get("#info").innerHTML+=o+"<br/>";}
function get(s) {return document.querySelector(s);}
//function get2(id) {return document.getElementById(id);}

