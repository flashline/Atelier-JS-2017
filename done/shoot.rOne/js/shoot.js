// main
// contants
const CANNON_STEP=6 ; const CANNON_BALL_SPEED=6;
const BALL_SIZE=14 ; const TARGET_SIZE=10-(CANNON_STEP/2);
// easy 	 : const LEVEL=1 ; const TARGET_LOOP=8*1000; const START_SCORE=100; const WIN_SCORE=50; TIME_SCORE=10 ;
// middle 	 : const LEVEL=2 ; const TARGET_LOOP=6*1000; const START_SCORE=80; const WIN_SCORE=50; TIME_SCORE=10 ;
// difficult : const LEVEL=3 ; const TARGET_LOOP=4*1000; const START_SCORE=80; const WIN_SCORE=30; TIME_SCORE=10 ;
const LEVEL=1 ; const TARGET_LOOP=8*1000; const START_SCORE=100; const WIN_SCORE=50; TIME_SCORE=10 ;
//
$("play").addEventListener('click',onPlay);
// global vars
var winCount, score, duration, successIdInterval,timeIdInterval, start;
var target,targetIdInterval,cannon,ballProtoElem,nextBallNum,gameIsOver;
var maxScore=0;
displayLegend();
/// Target
target={};
target.elem=$("target");	
target.w=TARGET_SIZE ; target.h=TARGET_SIZE;

/// Canon
cannon={};
cannon.elem=$("canon");	
cannon.x=285;
cannon.y=315;
cannon.w=cannon.elem.offsetWidth;
/// Ball
ballProtoElem=$("ballProto");
nextBallNum=0;
//
// functions
/// start func
function onPlay (e) {
	gameIsOver=false;
	$("play").style.display="none";
	$("gameOver").style.display="none";
	winCount=0 ;
	score=START_SCORE;
	start=Date.now();	
	timeIdInterval = window.setInterval(function () {
			duration=(Date.now()-start)/1000;
			$("time").innerHTML=Math.round(duration);
			$("score").innerHTML=score;
			score=(score>10)?score-TIME_SCORE:0; 				
			if (score==0) gameOver();
		},1000
	);	
	targetShow();
	targetIdInterval=window.setInterval(targetRefresh,TARGET_LOOP);	
	targetRefresh ();	
	/// Listeners adding
	document.addEventListener("keydown",onKeyDown);
}
/// end func
function gameOver () {
	$("score").innerHTML=score;
	$("level").innerHTML=LEVEL;
	gameIsOver=true;
	targetHide();
	$("maxScore").innerHTML=maxScore;
	$("play").innerHTML="Replay";
	$("play").style.display="inline";
	$("gameOver").style.display="block";
	window.clearInterval(timeIdInterval);
	window.clearInterval(targetIdInterval);
	document.removeEventListener("keydown",onKeyDown);
}
/// listeners
function onKeyDown (e) {	
	//left
	if (e.keyCode==37 && cannon.x>0) {
		canonMove(-CANNON_STEP);
	}
	//right
	else if (e.keyCode==39 && cannon.x<600-30) {
		canonMove(+CANNON_STEP);
	}	
	else if (e.keyCode==32 || e.keyCode==38 ) {
		ballShoot(); 
	}
}
/// Target func
function targetRefresh () {
	target.elem.style.display="block";
	target.x=Math.floor(Math.random() * (600-20) );
	target.y=Math.floor(Math.random() * 200 + 50 );
	target.elem.style.left=target.x+"px";
	target.elem.style.top=target.y+"px";	
};
function targetShow () {
	target.elem.style.display="block";
};
function targetHide () {
	target.elem.style.display="none";
};
/// Canon func
/**
 * move left and right the canon
 * @param step pixels number of one step
 */
function canonMove (step) {	
	cannon.x+=step;
	canonRefresh ();
}
function canonRefresh () {	
	cannon.elem.style.left=cannon.x+"px";
}
/// Ball func
function ballShoot () {	
	nextBallNum++;
	var ball={};
	ball.elem=ballProtoElem.cloneNode();	
	ball.elem.id="ball_"+nextBallNum;
	$("main").appendChild(ball.elem);
	ball.x=cannon.x+cannon.w/2-ball.elem.offsetWidth/2; ball.y=cannon.y;
	ball.w=BALL_SIZE ; ball.h=BALL_SIZE;	
	ballMove(ball);
};
function ballMove(ball) { 	
	ball.y-=CANNON_BALL_SPEED ;
	ballRefresh(ball);
	if (isCollision (target,ball) && !gameIsOver) success (ball); 
	else if (ball.y>-30) {		
		window.requestAnimationFrame(function () { ballMove(ball); });	
	}
	else $("main").removeChild(ball.elem);
}
function ballRefresh (ball) {
	ball.elem.style.left=ball.x+"px";
	ball.elem.style.top =ball.y+"px";	
};
/// others func
function isCollision (t,b) {		
	var hit = (
		t.x>=b.x &&
		t.x+t.w<=b.x+b.w &&
		t.y>=b.y &&
		t.y+t.h<=b.y+b.h
	) ;
	/*if (hit) {
		log("t.x>=b.x=>"+t.x+">="+b.x);
		log("t.x+t.w<=b.x+b.w=>"+(t.x+t.w)+"<="+(b.x+b.w));
		log("t.y>=b.y=>"+t.y+">="+b.y);
		log("t.y+t.h<=b.y+b.h=>"+(t.y+t.h)+"<="+(b.y+b.h));
		log("------");
	}*/
	return hit;
}
 function success (ball) {		
		$("bang").style.display="block";
		$("win").style.display="block";
		$("win").style.left=""+(ball.x-10)+"px";
		$("win").style.top=""+(ball.y-4)+"px";
		$("bang").style.left=""+ball.x+"px";
		$("bang").style.top=""+ball.y+"px";
		$("main").removeChild(ball.elem);
		successIdInterval=window.setInterval(function () {	
				$("bang").style.display="none" ;  
				$("win").style.display="none" ; 
				window.clearInterval(successIdInterval);				
			},2000
		);
 		window.clearInterval(targetIdInterval);
		targetIdInterval=window.setInterval(targetRefresh,TARGET_LOOP);	
		targetRefresh ();	
		winCount++;	
		score+=WIN_SCORE;//Math.round(winCount/duration*1000);
		maxScore=Math.max(maxScore,score);
		$("score").innerHTML=score;	
		$("success").innerHTML=winCount;
		
}

/// util func
function displayLegend () {
	log("After click on Play button, use ");
	log("- left and right arrows to move the cannon");
	log("- and space bar to shot the green target.");
}
function log (o) {$("info").innerHTML+=o+"<br/>";}
function $(s) {return document.getElementById(s);}


