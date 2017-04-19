// classe Util
var Util={
	 unsorted:[]
	,sorted:[]
	,add:function (v) {
		this.unsorted.push(v);
	}
	,sort:function () {
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
	,displaySorted:function () {
		this.log("----------------------- trié : "); 
		for (i = 0; i < this.sorted.length ; i++) { 
			this.log("n° "+(i+1)+" : "+this.sorted[i]);
		}
	}
	,displayUnsorted:function () {
		this.log("----------------------- non trié : "); 
		for (i = 0; i < this.unsorted.length ; i++) { 
			this.log("n° "+(i+1)+" : "+this.unsorted[i]);
		}
	}
	//private
	,insert:function (curr,j) {
		 this.sorted.splice(j, 0,curr);		

	}	
	//static func	
	,log:function (o) {
		this.get("#info").innerHTML+=o+"<br/>";
	}
	,get:function (s) {
		return document.querySelectorAll(s)[0];	
	}
}
//
// main
var MAX_LEN=15; 
var MAX_NUM=10;
var MIN_NUM=1;
for (i = 0; i < MAX_LEN; i++) { 
   Util.add(Math.floor(Math.random() * MAX_NUM + MIN_NUM));
 }
Util.displayUnsorted();
//...
for (i = 0; i < 5; i++) { 
   Util.add(Math.floor(Math.random() * MAX_NUM + MIN_NUM));
}
Util.displayUnsorted();
//...
Util.sort();
Util.displaySorted();
//...
