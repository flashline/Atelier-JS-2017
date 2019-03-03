// main

// contants
const CANNON_STEP=6 ; const CANNON_BALL_SPEED=6;
// easy 	 : const LEVEL=1 ; const TARGET_LOOP=8*1000; const START_SCORE=100; const SUCCESS_SCORE=50; TIME_SCORE=10 ;
// middle 	 : const LEVEL=2 ; const TARGET_LOOP=6*1000; const START_SCORE=80; const SUCCESS_SCORE=50; TIME_SCORE=10 ;
// difficult : const LEVEL=3 ; const TARGET_LOOP=4*1000; const START_SCORE=80; const SUCCESS_SCORE=30; TIME_SCORE=10 ;

//const SUCCESS_SCORE=30; FAILURE_SCORE=10 ; 
var levels=	[	{num:1,targetLoop:5.0,	goal:6,	failCause:3,	successScore:30, 	failureScore:15	}, 
				{num:2,targetLoop:4.0,	goal:7,	failCause:6,	successScore:50, 	failureScore:10	}, 
				{num:3,targetLoop:3.7,	goal:8,	failCause:8,	successScore:100,	failureScore:5	},
				{num:4,targetLoop:3.3,	goal:9,	failCause:10,	successScore:150,	failureScore:3	},
				{num:5,targetLoop:3.0,			failCause:12,	successScore:200,	failureScore:0	} 
			];
var currentLevel=0;
//
$("play").addEventListener('click',onPlay);
// global vars
var successCount, score, duration, successIdInterval,timeIdInterval, start, blinkCount;
var target,targetIdInterval,cannon,ballProtoElem,nextBallNum,gameIsOver,ballSize,failureCount;
var maxScore=0;blinkCount=0;
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
			$("level").innerHTML=levels[currentLevel].num;				
			
		},1000
	);	
	targetShow();
	targetIdInterval=window.setInterval(targetRefresh,levels[currentLevel].targetLoop*1000);	
	targetRefresh ();	
	
	/// Listeners adding
	document.addEventListener("keydown",onKeyDown);
}
/// end func
function gameOver () {
	$("endLevel").innerHTML=levels[currentLevel].num;
	gameIsOver=true;
	targetHide();
	//$("maxScore").innerHTML=Math.round(maxScore/duration*100); 
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
	target.x=Math.floor(Math.random() * 400 + 100 );
	target.y=Math.floor(Math.random() * 200 + 50 );
	target.elem.style.left=target.x+"px";
	target.elem.style.top=target.y+"px";
	//
	var fs=levels[currentLevel].failureScore; score=(score>fs)?score-fs:0; 	
	
	$("success").innerHTML=successCount;
	$("failure").innerHTML=failureCount;
	if ((failureCount-successCount)>levels[currentLevel].failCause) gameOver(); 	

	else if (currentLevel<4 && (successCount-failureCount)>levels[currentLevel].goal ) {
		currentLevel++; 
		var start = null;
		blinkCount=0;
		blink(1,0);
		failureCount=0; 
		successCount=0 ;
	}
	failureCount++;
};

function blink(swap,timestamp) {	
	if ((Math.floor(timestamp/100)*100)%200==0) {		
		swap*=-1;
		if (swap>0) {
			bgColor="#e87";
		}
		else {
			bgColor="#ffe";
		}
		$("level").style.backgroundColor=bgColor;		
	}	
	blinkCount++;	
	if (blinkCount<100) {
		
		window.requestAnimationFrame(function (timestamp) {	blink(swap,timestamp) }  );	
	}
	else {		
		$("level").style.backgroundColor="white";		
	}	
}
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
		targetIdInterval=window.setInterval(targetRefresh,levels[currentLevel].targetLoop*1000);	
		targetRefresh ();		
		successCount++;	
		score+=levels[currentLevel].successScore ;
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


