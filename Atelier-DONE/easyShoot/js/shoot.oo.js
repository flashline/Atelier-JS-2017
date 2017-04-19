// classes
var Canon=function (ec,eb,ox,oy) {
	this.elem=ec;	
	this.ballProtoElem=eb;
	this.x=ox;
	this.y=oy;
	this.num=0;
	this.move=function (step) {
		this.x+=step;
		this.refresh();
	};
	this.refresh=function () {		
		this.elem.style.top=""+this.y+"px";
		this.elem.style.left=""+this.x+"px";
	};	
	this.shoot=function (s) {
		this.num+=1;
		var el=this.createBallAsset();
		var ball=new Ball(s,el);
		ball.x=this.x-5;ball.y=this.y;
		ball.num=this.num;
		ball.refresh();
		ball.go();
	};
	this.createBallAsset=function () {
		var el=this.ballProtoElem.cloneNode();
		el.style.display="block";
		el.id="ball_"+this.num;
		get("#main").appendChild(el);
		return el;
	};
	this.move(0);
}
var Ball=function (s,eb) {
	this.speed=s;
	this.elem=eb;	
	this.x=0;
	this.y=0;	
	this.num;
	this.go=function () {
		this.loopId = setInterval(function () { 
								this.move();								
							}.bind(this),1);	
	};
	this.move=function () {
		this.y-=this.speed;
		this.refresh();		
		if (this.y<=-30)  this.remove(); 
		
	};
	this.remove=function () {
		clearInterval(this.loopId);
		get("#main").removeChild(this.elem);
	};
	this.refresh=function () {
		this.elem.style.left=""+this.x+"px";
		this.elem.style.top=""+this.y+"px";
	};	
}
var Target=function (el) {
	this.elem=el.cloneNode();
	this.elem.style.display="block";
	get("#main").appendChild(this.elem);	
	this.refresh=function () {
		var x=Math.floor(Math.random() * 600 );
		var y=Math.floor(Math.random() * 200 );
		this.elem.style.left=""+x+"px";
		this.elem.style.top=""+y+"px";
		
	};
	this.refresh();
	this.loopId = setInterval(function () { 
								this.refresh();								
							}.bind(this),5000);
}
// main
var CANON_STEP=5 ; var CANON_BALL_SPEED=2;
var target=new Target(get("#targetProto"));
var canon=new Canon(get("#canon"),get("#ballProto"),285,315) ;
document.addEventListener('keydown',onKeyDown,false);
displayLegend ();

// listeners
function onKeyDown (e) {	
	//left
	if (e.keyCode==37 && canon.x>0) {
		canon.move(-CANON_STEP);
	}
	//right
	else if (e.keyCode==39 && canon.x<600) {
		canon.move(+CANON_STEP);
	}	
	else if (e.keyCode==32 || e.keyCode==38 ) {
		canon.shoot(CANON_BALL_SPEED); //canon.shoot(Math.floor(Math.random() * CANON_BALL_SPEED + 3));		
	}
}
//func
function displayLegend () {
	log("Utiliser ");
	log("  les flèches gauche et droite pour déplacer le canon.");
	log("  et la barre d'espace pour tirer sur la cible verte.");
}

function log (o) {
	get("#info").innerHTML+=o+"<br/>";
}
function get (s) {
	return document.querySelectorAll(s)[0];	
}
