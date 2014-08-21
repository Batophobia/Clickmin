var items = {
	init: function(){
		if(this.types.nectar.total>0){
			$(".nectar").text("Nectar: "+this.types.nectar.total);
		}
		if(this.types.bombRock.total>0){
			$(".bombs").text("Bomb Rocks: "+this.types.bombRock.total);
		}
		if(Object.size(this.types.stuff)>0){
			for(var thing in this.types.stuff){
				var extraStuff="";
				if(this.types.stuff[thing].type=="onion")
					extraStuff="  id='"+thing+"' style='cursor: pointer;' onclick='items.useOnion(this);'";
				
				$(".stuff").append("<div"+extraStuff+">"+this.types.stuff[thing].display+"</div>");
			}
		}
		if(Object.size(this.types.pellets)>0){
			for(var thing in this.types.pellets){
				$(".pellets").append("<div>"+this.types.pellets[thing].color+" "+this.types.pellets[thing].numNeeded+"</div>");
			}
		}
	},
	
	throwBomb: function(){
		items.types.bombRock.total--;
		enemy.monsterList["0"].hp-=1000;
		$(".bombs").text("Bomb Rocks: "+this.types.bombRock.total);
		
		if(items.types.bombRock.total<1 || pikmin.squad.squadColorNum("yellow")<1)
			$('#btnBomb').hide();
	},
	
	types:{
		nectar	:{display:"Nectar",		total:0	},
		bombRock:{display:"Bomb Rock",	total:0	},
		stuff	:{},	//display, numNeeded, type
		pellets	:{} 	//color, numNeeded
	},
	
	giveBomb: function(){
		this.types.bombRock.total+=1;
		$(".bombs").text("Bomb Rocks: "+this.types.bombRock.total);
	},
	giveNectar: function(){
		this.types.nectar.total+=1;
		$(".nectar").text("Nectar: "+this.types.nectar.total);
	},
	givePellet: function(){
		var colors=[];
		if(pikmin.checkNum("red")>0)
			colors.push("Red");
		if(pikmin.checkNum("yellow")>0)
			colors.push("Yellow");
		if(pikmin.checkNum("blue")>0)
			colors.push("Blue");
		if(pikmin.checkNum("rock")>0)
			colors.push("Black");
		if(pikmin.checkNum("pink")>0)
			colors.push("Pink");
		
		this.types.pellets[Object.size(this.types.pellets)]={
			color: colors[batman(0,colors.length-1)],
			numNeeded: batman((3*explore.questArea),(5*explore.questArea))
		}
		
		$(".pellets").append("<div>"+this.types.pellets[Object.size(this.types.pellets)-1].color+" "+this.types.pellets[Object.size(this.types.pellets)-1].numNeeded+"</div>");
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
		var preFruit=["Straw","Water","Fire", "Ice", "Goji", "May", "Elder", "Musk", "Honey", "Sweet", "Sour", "Poison", "Coco", "Pik"];
		var postFruit=["melon", "berry", " Fruit"];
		
		disp = preFruit[explore.batman(0,preFruit.length-1)] + postFruit[explore.batman(0,postFruit.length-1)];
		numNeed = explore.batman((3*explore.questArea),(5*explore.questArea));
		thngType="fruit";
		
		this.types.stuff[Object.size(this.types.stuff)]={
			display: disp,
			numNeeded: numNeed,
			type: thngType
		};
		$(".stuff").append("<div>"+disp+"</div>");
	}
};