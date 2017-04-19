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
	this.viewfinder={};
	this.go=function () {
		this.loopId = setInterval(this.move.bind(this),1);
	};
	this.move=function () {
		this.x+=this.sin*this.speed;
		this.y+=this.cos*this.speed*-1;
		this.refresh();
		if (this.onMove!=null) {
			this.viewfinder.xStart=this.x+8;
			this.viewfinder.xEnd=this.x+8+14;
			this.viewfinder.yStart=this.y+8;
			this.viewfinder.yEnd=this.y+8+14;
			this.viewfinder.ball=this;
			this.onMove(this.viewfinder);
		}
		if (this.y<=0)  this.cos=-this.cos;
		if (this.x>=570 || this.x<=0 ) this.sin=-this.sin;
		if (this.y>=400)  this.remove(); //|| this.y<=-30	
		
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
	this.xStart=x; this.yStart=y; this.diam=10 ;
	this.xEnd=x+this.diam; this.yEnd=y+this.diam;
	this.elem.style.display="block";
	get("#main").appendChild(this.elem);
	this.elem.style.left=""+this.xStart+"px";
	this.elem.style.top=""+this.yStart+"px";
}
// main
var ROTATE_STEP=1 ; var CANON_BALL_SPEED=1 ;
var canon=new Canon(get("#canon"),get("#ballProto"),285,315) ;
document.addEventListener('keydown',onKeyDown,false);
log("Viser la cible verte en utilisant :");
log("  flèches gauche et droite pour la rotation du canon.");
log("  la barre d'espace pour tirer.")
var x=Math.floor(Math.random() * 600 );
var y=Math.floor(Math.random() * 200 );
var target=new Target(get("#targetProto"),x,y);
// listeners
canon.onBallMove = function (e) {
	if (		
		target.xStart>=e.xStart &&
		target.xEnd<=e.xEnd &&
		target.yStart>=e.yStart &&
		target.yEnd<=e.yEnd 
	) {
		e.ball.stop();
		document.removeEventListener('keydown',onKeyDown,false);
		//
		var mEl=get(".msg");
		mEl.style.display="block";
		mEl.innerHTML+="Vous avez GAGNE !!! :-)"+"<br/>";
		if (e.ball.num>1) {
			mEl.innerHTML+="... avec "+(e.ball.num+1)+" essais :-( "+"<br/>";
		}		
		mEl.innerHTML+="<br/>";
		mEl.innerHTML+="Rafraîchir la page pour redémarrer."+"<br/>";
		
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
function log (o) {
	get("#info").innerHTML+=o+"<br/>";
}
function get (s) {
	return document.querySelectorAll(s)[0];	
}
