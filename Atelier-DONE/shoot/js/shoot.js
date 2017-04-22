// classes
var Canon=function (ec,eb,ox,oy) {
	this.elem=ec;	
	this.ballProtoElem=eb;
	this.ox=ox;
	this.oy=oy;
	//
	this.alpha=0;
	this.num=0;
	this.onBallMove=null;	
	this.move=function (d) {
		this.alpha+=d;this.radian = this.alpha * Math.PI / 180;
		this.cos=Math.cos(this.radian);
		this.sin=Math.sin(this.radian);	
		this.refresh();
	};
	this.refresh=function () {
		this.elem.style.transform="rotate("+this.alpha+"deg)";
	};	
	this.shoot=function (s) {
		this.num+=1;
		var el=this.createBallAsset();
		var ball=new Ball(s,el,this.cos,this.sin);
		ball.onMove=this.onBallMove;
		ball.x=this.ox;ball.y=this.oy;
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
var Ball=function (s,eb,cos,sin) {
	this.speed=s;
	this.elem=eb;	
	this.cos=cos;
	this.sin=sin;	
	this.num;
	this.rectangle=new Rectangle(0,0,14,14);
	this.go=function () {
		this.loopId = setInterval(this.move.bind(this),1);
	};
	this.move=function () {
		this.x+=this.sin*this.speed;
		this.y+=this.cos*this.speed*-1;
		this.refresh();
		this.rectangle.move(this.x+8,this.y+8);
		if (this.onMove!=null) this.onMove(this);
		if (this.y<=0)  this.cos=-this.cos;
		if (this.x>=570 || this.x<=0 ) this.sin=-this.sin;
		if (this.y>=400)  this.remove(); 
		
	};
	this.remove=function () {
		this.stop();
		get("#main").removeChild(this.elem);
	};
	this.stop=function () {
		clearInterval(this.loopId);
	};
	this.refresh=function () {
		this.elem.style.left=""+this.x+"px";
		this.elem.style.top=""+this.y+"px";
	};	
}
var Target=function (el,x,y) {
	this.elem=el.cloneNode();	
	var length=10 ;
	this.rectangle=new Rectangle(x,y,length,length);
	this.elem.style.display="block";
	get("#main").appendChild(this.elem);
	this.elem.style.left=""+x+"px";
	this.elem.style.top=""+y+"px";
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
var ROTATE_STEP=1 ; var CANON_BALL_SPEED=1 ; var SCENE_WIDTH=600 ; var SCENE_HEIGHT=200 ; var SCENE_MARGIN=25 ; var TARGET_WIDTH=20 ;
var canon=new Canon(get("#canon"),get("#ballProto"),285,315) ;
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
	if (e.keyCode==37 && canon.alpha-ROTATE_STEP>-90) {
		canon.move(-ROTATE_STEP);
	}
	//right
	else if (e.keyCode==39 && canon.alpha+ROTATE_STEP<90) {
		canon.move(+ROTATE_STEP);
	}	
	else if (e.keyCode==32 || e.keyCode==38 ) {
		canon.shoot(CANON_BALL_SPEED); //canon.shoot(Math.floor(Math.random() * CANON_BALL_SPEED + 3));		
	}
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