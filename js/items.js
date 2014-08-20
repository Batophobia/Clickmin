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
		nectar	:{display:"Nectar",		total:0	},
		bombRock:{display:"Bomb Rock",	total:0	},
		stuff	:{},	//display, numNeeded, type
		pellets	:{} 	//color, numNeeded
	},
	
	useOnion: function(itm){
		var thing=itm.id;
		var clr=this.types.stuff[thing].display.split(" ")[0].toLowerCase();
		itm.remove();
		
		if(clr=="black")
			clr="rock";
		
		pikmin.give(clr,"leaf");
		$("#"+clr+"Block").show();
		$("#"+clr+"Squad").show();
		$("#btnMap").show();
		
		if(clr=="red"){
			explore.places["1"].canGo=true;
			explore.unlock(1);
		}
		
		var tmpPic=$("#img"+clr).html();
		$("#discovery").html("Discovered new Pikmin<br/>"+tmpPic);
		setTimeout('$("#discovery").html("");',5000);
		this.delStuff(thing);
	},
	
	delStuff: function(itmID){
		for(i=parseInt(itmID);i<Object.size(this.types.stuff)-1;i++){
			this.types.stuff[i]=this.types.stuff[i+1];
			$("#"+(i+1)).attr("id",i);
		}
		delete this.types.stuff[Object.size(this.types.stuff)-1];
	},
	
	give: function(displayN, numNeededN, typeN){
		main.alrt("Found "+displayN);
		items.addThing(displayN, numNeededN, typeN);
	},
	
	addThing: function(displayN, numNeededN, typeN){
		this.types.stuff[Object.size(this.types.stuff)]={
			display: displayN,
			numNeeded: numNeededN,
			type: typeN
		};
		
		var extraStuff="";
		if(typeN=="onion"){
			extraStuff=" style='cursor: pointer;' onclick='items.useOnion(this);'";
		}
		
		$(".stuff").append("<div id='"+(Object.size(this.types.stuff)-1)+"' "+extraStuff+">"+displayN+"</div>");
	},
	addRandomThing: function(){
		var disp, numNeed, thngType;
		this.types.stuff[Object.size(this.types.stuff)]={
			display: disp,
			numNeeded: numNeed,
			type: thngType
		};
		$(".stuff").append("<div>"+disp+"</div>");
	}
};