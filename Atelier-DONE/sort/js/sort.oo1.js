// classe Util
var Util=function (n) {
	this.name=n;
	this.unsorted=[];
	this.sorted=[];
	this.add=function (v) {
		this.unsorted.push(v);
	};
	this.sort=function () {
		for (var i = 0; i < this.unsorted.length ; i++) { 
			var curr=this.unsorted[i];
			if (this.sorted.length==0) {
				this.sorted.push(curr);
			}
			else {
				var match=false;	 
				Loop2:
				for (var j = 0; j < this.sorted.length ; j++) { 
					if (curr<this.sorted[j]) {
						match=true;
						this.insert(curr,j);			  
						break Loop2;
					}
				}	 
				if (!match) {
					this.sorted.push(curr) ;
				}
			}
		}
		return this.sorted;
	};
	this.displaySorted=function () {
		this.log("----------------------- "+this.name+" trié : "); 
		for (i = 0; i < this.sorted.length ; i++) { 
			this.log("n° "+(i+1)+" : "+this.sorted[i]);
		}
	};
	this.displayUnsorted=function () {
		this.log("----------------------- "+this.name+" non trié : "); 
		for (i = 0; i < this.unsorted.length ; i++) { 
			this.log("n° "+(i+1)+" : "+this.unsorted[i]);
		}
	};
	//private
	this.insert=function (curr,j) {
		 this.sorted.splice(j, 0,curr);		

	};	
	//static func	
	this.log=function (o) {
		this.get("#info").innerHTML+=o+"<br/>";
	};
	this.get=function (s) {
		return document.querySelectorAll(s)[0];	
	};
}
//
// main
var MAX_LEN=15; 
var MAX_NUM=10;
var MIN_NUM=1;
var u=new Util("U");
for (i = 0; i < MAX_LEN; i++) { 
   u.add(Math.floor(Math.random() * MAX_NUM + MIN_NUM));
 }
u.displayUnsorted();
u.sort();
u.displaySorted();
//...
var u2=new Util("U2");
for (i = 0; i < 5; i++) { 
   u2.add(Math.floor(Math.random() * MAX_NUM + MIN_NUM));
}
u2.displayUnsorted();
u2.sort();
u2.displaySorted();
//...
