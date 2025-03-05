// classes
class Clock {
	constructor() {	}
	/*
	Start a loop.
	@param s	Seconds between loops 
	@param f	Function called
	@return		Loop ID
	*/
	loop (s,f) {
		var id=window.setInterval(function(){
			f();			
		}.bind(this),s*1000);
		return id;
	}
	/*
	Clear a loop.
	@param id	Loop ID
	@return		Same loop ID
	*/
	stop (id) {
		window.clearInterval(id); 
		return id;
	}
	/*
	Call a function once after a delay.
	@param s	Delay in seconds.
	@param f	Function called
	@return		Loop ID
	*/
	delay(s,f) {		
		var id=window.setInterval(function(){
			f();
			window.clearInterval(id); 
			
		}.bind(this),s*1000);
		return id;
	}	
	/*
	Repeat a function n times.
	@param s	Seconds between loops.
	@param f	Function called.
	@param n	Number of repeats.
	@return		Loop ID
	*/
	repeat(s,f,n) {
		var i=0;
		var id=window.setInterval(function(){
			i++;
			f(i);
			if (i>=n) 
				window.clearInterval(id); 
			
		}.bind(this),s*1000);
		return id;
	}
	/*
	Repeat alternatively 2 functions [n times if n is specified].
	@param s	Seconds between loops.
	@param f1	First function called.
	@param f2	Second function called.
	@param n	Number of repeats.
	@param fe	function called at end if not null.
	@return		Loop ID
	*/	
	toggle(s,f1,f2,n=null,fe=null) {
		var i=0; var swap=1; var f;
		var id=window.setInterval(function(){
			i++;
			if (swap>0) f=f1; else f=f2;
			swap*=-1;			
			f(i);
			if (n!=null && i>=n) {
				window.clearInterval(id); 
				if (fe!=null) fe();
			}
			
		}.bind(this),s*1000);
		return id;
	}
	/*
	Repeat a function for a period of time.
	@param s	Seconds between loops.
	@param f	Function called..
	@param d	Duration.
	@return		Loop ID
	*/	
	during (s,f,d) {
		var start=Date.now();
		var id=window.setInterval(function(){
			f();
			if (Date.now()-start>d*1000)
				window.clearInterval(id);
		}.bind(this),s*1000);
		return id;
	}
	/*
	Repeat while the function return true.
	@param s	Seconds between loops.
	@param f	Function called and must return true or false, with regard to a global event, for example.
	@return		Loop ID
	*/	
	whileTrue (s,f) {
		var i=0;
		var id=window.setInterval(function(){
			i++;
			if (!f(i)) 
				window.clearInterval(id); 
			
		}.bind(this),s*1000);
		return id;
	}
}