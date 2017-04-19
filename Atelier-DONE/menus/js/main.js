// main
/// constants
var SPEED=15 ; var IMG_PER_SECOND=48 ;
/// left right
var leftRightIsOpening=false;
var leftRightLoopId;
var leftRightElem=get(".leftRightElem");
var leftRightButton=get(".leftRight button");
var leftRightX=-220;
leftRightElem.style.zIndex="1";
leftRightElem.style.left=""+leftRightX+"px";
/// top down
var topDownIsOpening=false;
var topDownLoopId;
var topDownElem=get(".topDownElem");
var topDownButton=get(".topDown button");
var topDownY=0;
topDownElem.style.zIndex="2";
topDownElem.style.height=""+topDownY+"px";
// elems swap
var elemLoopId=null;
var elemOpacity=1; var dir=-1;
var underElem=null ; var topElem=null ;
//
displayLegend ();
// functions
///listeners adding.
leftRightButton.addEventListener('click',onLeftRightClick,false);
leftRightElem.addEventListener('click',onElemClick,false);
topDownButton.addEventListener('click',onTopDownClick,false);
topDownElem.addEventListener('click',onElemClick,false);
/// left right
function onLeftRightClick (e) {	
	leftRightIsOpening=!leftRightIsOpening;	
	leftRightStop () ;
	leftRightLoopId=setInterval(leftRightMove,1000/IMG_PER_SECOND);	
}
function leftRightMove() {
	if (leftRightIsOpening) {
		leftRightX+=SPEED; 
		if (leftRightX>=0) {
			leftRightX=0;
			leftRightStop () ;
		}
	}
	else {
		leftRightX-=SPEED ;
		if (leftRightX<=-220) {
			leftRightX=-220;
			leftRightStop () ;
		}
	}
	leftRightElem.style.left=""+leftRightX+"px";
}
function leftRightStop () {
	if (leftRightLoopId!=null) { clearInterval(leftRightLoopId);hideLegend ();leftRightLoopId=null;}
}
/// top down
function onTopDownClick (e) {	
	topDownIsOpening=!topDownIsOpening;	
	topDownStop () ;
	topDownLoopId=setInterval(topDownMove,1000/IMG_PER_SECOND);
}
function topDownMove() {
	if (topDownIsOpening) {
		topDownY+=SPEED; 
		if (topDownY>=260) {
			topDownY=260;
			topDownStop () ;
		}
	}
	else {
		topDownY-=SPEED ;
		if (topDownY<=0) {
			topDownY=0;
			topDownStop () ;
		}
	}
	topDownElem.style.height=""+topDownY+"px";
}
function topDownStop () {
	if (topDownLoopId!=null) clearInterval(topDownLoopId);
}
/// elems swap
function onElemClick (e) {
	if (elemLoopId==null &&
		topDownIsOpening &&
		leftRightIsOpening ) {
			if (parseInt(leftRightElem.style.zIndex)<parseInt(topDownElem.style.zIndex)) 	{underElem=leftRightElem ; topElem=topDownElem ;}
			else 																			{underElem=topDownElem ; topElem=leftRightElem ; }
			//
			elemLoopId=setInterval(elemMove,1000/24);
	}	
}
function elemMove() {
	elemOpacity+=0.2*dir;
	if (elemOpacity<=0) {
		elemOpacity=0;
		dir=-dir;
		var zi=underElem.style.zIndex ;
		underElem.style.zIndex=topElem.style.zIndex ;
		topElem.style.zIndex=zi;
	}
	else if (elemOpacity>=1) {
		elemOpacity=1;
		dir=-dir;
		elemStop () ;
	}
	topElem.style.opacity=elemOpacity.toString(); // or ""+elemOpacity	
}
function elemStop () {
	if (elemLoopId!=null) {		
		clearInterval(elemLoopId);
		elemLoopId=null;
	}
}
/// legend
function displayLegend () {
	log("");
	log("Cliquer sur les pictos droit et gauche pour ouvrir/fermer les menus (toggle)");
	log("");
	log("Puis cliquer sur les menus vert ou rouge pour les passer dessus-dessous (z-index)");	
}
function hideLegend () {
	if (leftRightIsOpening) get("#info").style.opacity=".2"; else get("#info").style.opacity="1";
}

/// util func
function log (v) {
	get("#info").innerHTML+=v+"<br/>";
}
function get(s) {
	return document.querySelectorAll(s)[0];	
}
