var items = {
	init: function(){
		if(this.types.nectar.owned>0){
			//Display Nectar
		}
		if(this.types.bombRock.owned>0){
			//Display Bomb Rocks
		}
		if(Object.size(this.types.stuff)>0){
			for(var thing in this.types.stuff){
				var extraStuff="";
				if(this.types.stuff[thing].type=="onion")
					extraStuff="  id='"+thing+"' style='cursor: pointer;' onclick='items.useOnion(this);'";
				
				$(".stuff").append("<div"+extraStuff+">"+this.types.stuff[thing].display+"</div>");
			}
		}
		if(Object.size(this.types.stuff)>0){
			//Display Pellets
		}
	},
	
	types:{
		nectar	:{display:"Nectar",		total:0,	owned:0	},
		bombRock:{display:"Bomb Rock",	total:0,	owned:0	},
		stuff	:{},	//display, numNeeded, x, y, type
		pellets	:{} 	//color, numNeeded, numRed, numYellow, numBlue, x, y
	},
	
	useOnion: function(itm){
		var thing=itm.id;
		var clr=this.types.stuff[thing].display.split(" ")[0].toLowerCase();
		itm.remove();
		
		pikmin.give(clr,"leaf");
		$("#"+clr+"Block").show();
		$(".topBar").show();
		
		var tmpPic=$("#img"+clr).html();
		$("#discovery").html("Discovered new Pikmin<br/>"+tmpPic);
		setTimeout('$("#discovery").html("");',5000);
		this.delStuff(thing);
	},
	
	delStuff: function(itmID){
		for(i=parseInt(itmID);i<Object.size(this.types.stuff)-1;i++){
			this.types.stuff[i]=this.types.stuff[i+1];
		}
		delete this.types.stuff[Object.size(this.types.stuff)-1];
	},
	
	addThing: function(displayN, numNeededN, xN, yN, typeN){
		this.types.stuff[Object.size(this.types.stuff)]={
			display: displayN,
			numNeeded: numNeededN,
			x: xN,
			y: yN,
			type: typeN
		};
		
		var extraStuff="";
		if(typeN=="onion"){
			extraStuff=" style='cursor: pointer;' onclick='items.useOnion(this);'";
		}
		
		$(".stuff").append("<div id='"+Object.size(this.types.stuff)+"' "+extraStuff+">"+displayN+"</div>");
	},
	addRandomThing: function(){
		var disp, numNeed, mpX, mpY, thngType;
		this.types.stuff[Object.size(this.types.stuff)]={
			display: disp,
			numNeeded: numNeed,
			x: mpX,
			y: mpY,
			type: thngType
		};
		$(".stuff").append("<div>"+disp+"</div>");
	}
};