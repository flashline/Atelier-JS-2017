// classes
/**
* Target
*
* @param 	el 	prototype element of <div> target
* @param 	x	left pos
* @param 	y	top position
*/
var Target=function (el,x,y) {
	var elem=el.cloneNode();	
	this.rectangle=new Rectangle(x,y,TARGET_COLISION_SIDE,TARGET_COLISION_SIDE);		
	elem.style.display="block";
	get("#main").appendChild(elem);
	elem.style.left=x+"px";
	elem.style.top=y+"px";
}
/**
* Canon class
*
* @param 	elem 			element of <div> canon
* @param 	ballProtoElem	prototype element of <div> ball
* @param 	ox				canon x pos -used to set origin ball position
* @param 	oy				canon y pos -used to set origin ball position
*/
var Canon=function (elem,ballProtoElem,ox,oy) {
	this.alpha=0;
	var num=0;
	var sin; var cos;
	this.onBallMove=null;	
	this.move=function (d) {
		this.alpha+=d; 
		var radian = this.alpha * Math.PI / 180;
		sin=Math.sin(radian);	
		cos=Math.cos(radian);
		refresh(this.alpha);
	};
	this.shoot=function (speed) {
		num+=1;
		var ball=new Ball(speed,createBallAsset(ballProtoElem),sin,cos);
		ball.onMove=this.onBallMove;
		ball.x=ox;ball.y=oy;
		ball.num=num;
		ball.refresh(this.alpha);
		ball.go(CANON_BALL_PERIOD);
	};
	function refresh (alpha) {
		elem.style.transform="rotate("+alpha+"deg)";
	};	
	function createBallAsset (ballProtoElem) {
		var el=ballProtoElem.cloneNode();
		el.style.display="block";
		el.id="ball_"+num;
		get("#main").appendChild(el);
		return el;
	};	
	this.move(0);
}
/**
* Ball class
*
* @param 	speed 	speed (nb of pixels for each loop)
* @param 	elem	element <div> for this ball
* @param 	sin		sin of the movement orientation
* @param 	cos		cos of the movement orientation
*/
var Ball=function (speed,elem,sin,cos) {
	this.x;
	this.y;
	this.num;
	var loopId;
	this.rectangle=new Rectangle(0,0,BALL_COLISION_SIDE,BALL_COLISION_SIDE);
	this.go=function (period) {
		loopId = setInterval(move.bind(this),period);
	};
	this.remove=function () {
		this.stop();
		get("#main").removeChild(elem);
	};
	this.stop=function () {
		clearInterval(loopId);
	};
	this.refresh=function () {
		elem.style.left=""+this.x+"px";
		elem.style.top=""+this.y+"px";
	};	
	function move () {
		this.x+=sin*speed;
		this.y+=cos*speed*-1;
		this.refresh();
		this.rectangle.move(this.x,this.y);
		if (this.onMove!=null) this.onMove(this);
		if (this.y<=0)  cos=-cos;
		if (this.x>=570 || this.x<=0 ) sin=-sin;
		if (this.y>=400) this.remove(); 
	};	
}
var Rectangle=function (x,y,w,h) {
	this.width=w;
	this.height=h;	
	this.move = function (x,y) {
		this.xStart=x;
		this.yStart=y;
		this.xEnd=this.xStart+this.width;
		this.yEnd=this.yStart+this.height;	
	}
	this.move(x,y);
}
// main
const ROTATE_STEP=1 ; const CANON_BALL_SPEED=6 ; const CANON_BALL_PERIOD=1000/150 ; 
const CANON_X=285 ; const CANON_Y=315 ; const BALL_COLISION_SIDE=14+2 ; const TARGET_COLISION_SIDE=10-2 ; 
const SCENE_WIDTH=600 ; const SCENE_HEIGHT=200 ; const SCENE_MARGIN=25 ; const TARGET_WIDTH=20 ;
var canon=new Canon(get("#canon"),get("#ballProto"),CANON_X,CANON_Y) ;
document.addEventListener('keydown',onKeyDown,false);
log("Viser la cible verte en utilisant :");
log("  flèches gauche et droite pour la rotation du canon.");
log("  la barre d'espace pour tirer.")
var x=Math.floor(Math.random() * (SCENE_WIDTH  - SCENE_MARGIN - TARGET_WIDTH ) 	+ SCENE_MARGIN );
var y=Math.floor(Math.random() * (SCENE_HEIGHT - SCENE_MARGIN) 					+ SCENE_MARGIN );
var target=new Target(get("#targetProto"),x,y);
// listeners
canon.onBallMove = function (ball) {		
	if ( isCollision (target.rectangle,ball.rectangle) ) {			
		ball.stop();
		document.removeEventListener('keydown',onKeyDown,false);
		displayYouWin(ball);		
	}
}
function onKeyDown (e) {	
	//left
	if (e.keyCode==37 && canon.alpha-ROTATE_STEP>-90) canon.move(-ROTATE_STEP);
	//right
	else if (e.keyCode==39 && canon.alpha+ROTATE_STEP<90) canon.move(+ROTATE_STEP);
	//shoot
	else if (e.keyCode==32 || e.keyCode==38 ) canon.shoot(CANON_BALL_SPEED);
}
//func
function displayYouWin(ball) {
	var mEl=get(".msg");
	mEl.style.display="block";
	mEl.innerHTML+="<br/>Vous avez GAGNE !!! :-)"+"<br/><br/>";
	if (ball.num>1) {
		mEl.innerHTML+="... après "+(ball.num)+" tir(s) :-( "+"<br/>";
	}		
	mEl.innerHTML+="<br/>";
	mEl.innerHTML+="Rafraîchir la page pour redémarrer."+"<br/>";	
}
function isCollision (r1,r2) {
	return (
	r1.xStart>=r2.xStart &&
	r1.xEnd<=r2.xEnd &&
	r1.yStart>=r2.yStart &&
	r1.yEnd<=r2.yEnd 
	) ;
}
//util func
function log (o) {
	get("#info").innerHTML+=o+"<br/>";
}
function get (s) {
	return document.querySelector(s);	
}
/*
log("target.rectangle.xStart="+target.rectangle.xStart);
log("target.rectangle.yStart="+target.rectangle.yStart);
log("target.rectangle.xEnd="+target.rectangle.xEnd);
log("target.rectangle.yEnd="+target.rectangle.yEnd);
log("---");
log("ball.rectangle.xStart="+ball.rectangle.xStart);
log("ball.rectangle.yStart="+ball.rectangle.yStart);
log("ball.rectangle.xEnd="+ball.rectangle.xEnd);
log("ball.rectangle.yEnd="+ball.rectangle.yEnd);
log("------");
log("------");
*/