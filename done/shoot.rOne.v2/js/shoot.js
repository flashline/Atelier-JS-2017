// main
// contants
const CANNON_STEP=6 ; const CANNON_BALL_SPEED=6;
// easy 	 : const LEVEL=1 ; const TARGET_LOOP=8*1000; const START_SCORE=100; const SUCCESS_SCORE=50; TIME_SCORE=10 ;
// middle 	 : const LEVEL=2 ; const TARGET_LOOP=6*1000; const START_SCORE=80; const SUCCESS_SCORE=50; TIME_SCORE=10 ;
// difficult : const LEVEL=3 ; const TARGET_LOOP=4*1000; const START_SCORE=80; const SUCCESS_SCORE=30; TIME_SCORE=10 ;
const LEVEL=1 ; const TARGET_LOOP=6*1000; const SUCCESS_SCORE=30; FAILURE_SCORE=10 ; 
var levels=	[	{num:1,targetLoop:8*1000},
				{num:2,targetLoop:6*1000},
				{num:3,targetLoop:4*1000},
				{num:4,targetLoop:3*1000},
				{num:5,targetLoop:2*1000}
			];
var currentLevel=0;
//
$("play").addEventListener('click',onPlay);
// global vars
var successCount, score, duration, successIdInterval,timeIdInterval, start;
var target,targetIdInterval,cannon,ballProtoElem,nextBallNum,gameIsOver,ballSize,failureCount;
var maxScore=0;
displayLegend();
/// Target
target={};
target.elem=$("target");
target.w=target.elem.offsetWidth-(CANNON_STEP/2); target.h=target.w;	
/// Canon
cannon={};
cannon.elem=$("canon");	
cannon.x=cannon.elem.offsetLeft;
cannon.y=cannon.elem.offsetTop;
cannon.w=cannon.elem.offsetWidth;
/// Ball
ballProtoElem=$("ballProto");
ballSize=ballProtoElem.offsetWidth+(CANNON_STEP/2);
nextBallNum=0;
//
// functions
/// start func
function onPlay (e) {   
	failureCount=0; 
	$("play").style.display="none";
	$("gameOver").style.display="none";
	gameIsOver=false;
	successCount=0 ;
	score=0;
	start=Date.now();	
	timeIdInterval = window.setInterval(function () {
			duration=(Date.now()-start)/1000;
			$("time").innerHTML=Math.round(duration);			
			$("score").innerHTML=score;	
			
		},1000
	);	
	targetShow();
	targetIdInterval=window.setInterval(targetRefresh,levels[currentLevel].targetLoop);	
	targetRefresh ();	
	
	/// Listeners adding
	document.addEventListener("keydown",onKeyDown);
}
/// end func
function gameOver () {
	/*$("score").innerHTML=score;*/
	$("level").innerHTML=levels[currentLevel].num;
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
	targetShow ();
	target.x=Math.floor(Math.random() * (600-20) );
	target.y=Math.floor(Math.random() * 200 + 50 );
	target.elem.style.left=target.x+"px";
	target.elem.style.top=target.y+"px";
	//
	score=(score>FAILURE_SCORE)?score-FAILURE_SCORE:0; 	
	//if (score==0) gameOver();
	$("success").innerHTML=successCount;
	$("failure").innerHTML=failureCount;	
	if ((failureCount-successCount)>3) gameOver(); 
	else if (currentLevel===0 && (successCount-failureCount)>3 ||
			 currentLevel===1 && (successCount-failureCount)>6 ||
			 currentLevel===2 && (successCount-failureCount)>8 ||
			 currentLevel===3 && (successCount-failureCount)>10
			) 
	{
		currentLevel++; 
		failureCount=0; 
		successCount=0 ;
		log("level "+levels[currentLevel].num);
	}
	failureCount++;
};
function targetShow () {
	target.elem.style.visibility="visible";
};
function targetHide () {
	target.elem.style.visibility="hidden      ";
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
	ball.w=ballSize ; ball.h=ballSize;
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
		failureCount--;
		window.clearInterval(targetIdInterval);
		targetIdInterval=window.setInterval(targetRefresh,levels[currentLevel].targetLoop);	
		targetRefresh ();	
		successCount++;	
		score+=SUCCESS_SCORE;//Math.round(successCount/duration*1000);
		maxScore=Math.max(maxScore,score);
		$("score").innerHTML=score;	
		$("success").innerHTML=successCount;
		
}

/// util func
function displayLegend () {
	log("After click on Play button, use ");
	log("- left and right arrows to move the cannon");
	log("- and space bar to shot the green target.");
}
function log (o) {$("info").innerHTML+=o+"<br/>";}
function $(s) {return document.getElementById(s);}


