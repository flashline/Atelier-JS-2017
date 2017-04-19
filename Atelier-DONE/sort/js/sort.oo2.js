// class Util
Util=(function () {
	var Util=function(n) {this.name=n;this.sorted=[];this.unsorted=[];};
	Util.prototype.unsorted;
	Util.prototype.sorted;
	Util.prototype.name="";
	Util.prototype.add=function (v) {
		this.unsorted.push(v);
	}
	Util.prototype.sort=function () {
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
	}
	Util.prototype.displaySorted=function () {
		Util.log(this.name+" trié : "); 
		for (i = 0; i < this.sorted.length ; i++) { 
			Util.log("n° "+(i+1)+" : "+this.sorted[i]);
		}
	}
	Util.prototype.displayUnsorted=function () {
		Util.log(this.name+" non trié : "); 
		for (i = 0; i < this.unsorted.length ; i++) { 
			Util.log("n° "+(i+1)+" : "+this.unsorted[i]);
		}
	}
	//private
	Util.prototype.insert=function (curr,j) {
		 this.sorted.splice(j, 0,curr);		

	}	
	//static func	
	Util.log=function (o) {
		Util.get("#info").innerHTML+=o+"<br/>";
	}
	Util.get=function (s) {
		return document.querySelectorAll(s)[0];	
	}
	return Util;
})();
//
// main
var MAX_LEN=15; 
var MAX_NUM=10;
var MIN_NUM=1;
var u=new Util("Tri de u");
for (i = 0; i < MAX_LEN; i++) { 
   u.add(Math.floor(Math.random() * MAX_NUM + MIN_NUM)); 
}
u.displayUnsorted();
u.sort();
u.displaySorted();
//...
var u2=new Util("Tri de u2");
for (i = 0; i < MAX_LEN/3; i++) { 
  u2.add(Math.floor(Math.random() * MAX_NUM + MIN_NUM));
}
u2.displayUnsorted();
u2.sort();
u2.displaySorted();