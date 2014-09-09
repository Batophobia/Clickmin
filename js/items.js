var items = {
	init: function(){
		if(this.types.nectar.total>0){
			$(".nectar").text("Nectar: "+this.types.nectar.total);
			$("#item16").addClass("canShow");
		}
		if(this.types.bombRock.total>0){
			$(".bombs").text("Bomb Rocks: "+this.types.bombRock.total);
			$("#item15").addClass("canShow");
		}
		if(Object.size(this.types.stuff)>0){
			for(var thing in this.types.stuff){
				var extraStuff="";
				
				if(this.types.stuff[thing].type=="onion")
					extraStuff="  id='"+thing+"' style='cursor: pointer;' onclick='items.useOnion(this);'";
				else if(this.types.stuff[thing].type=="flower")
					extraStuff=" style='cursor: pointer;' class='candypop'";
				
				$(".stuff").append("<div id='"+(Object.size(this.types.stuff)-1)+"' "+extraStuff+">"+this.types.stuff[thing].display+"</div>");
			}
		}
		if(Object.size(this.types.pellets)>0){
			$("#item45").addClass("canShow");
			$(".pellets").show();
			for(var thing in this.types.pellets){
				$(".pellets").append("<div>"+this.types.pellets[thing].color+" "+this.types.pellets[thing].numNeeded+"</div>");
			}
		}
		
		$(".nectar").on('click',function(){
			items.select("nectar");
			if(items.selectedItem=="nectar"){
				$("#btnRndNectar").show();
				$("#btnRndFlower").hide();
			}else
				$("#btnRndNectar").hide();
		});
		$(".candypop").on('click',function(){
			items.select(this);
			if(items.types.stuff[items.selectedItem.id].display.split(" ")[1].toLowerCase()=="candypop"){
				$("#btnRndFlower").show();
				$("#btnRndNectar").hide();
			}else
				$("#btnRndFlower").hide();
		});
		$(".pikminMenu").on('click',function(){
			items.useItem(this.id);
		});
		$("#btnRndNectar").on('click',function(){
			items.useItem("");
		});
		$("#btnRndFlower").on('click',function(){
			items.useFlower(items.selectedItem, "");
		});
	},
	selectedItem: "",
	
	useItem: function(clr){
		if(clr!="")
			clr=clr.slice(0,-5);
		
		if(items.selectedItem=="nectar"){
			if(items.types.nectar.total<=0){
				this.selectedItem='';
				this.select("nectar");
				return false;
			}
			items.types.nectar.total--;
			var minNum=5, maxNum=10;
			var promoteThisMany = explore.batman(minNum,maxNum);
			
			for(i=0;i<promoteThisMany;i++){
				pikmin.promote(clr);
			}
			$(".nectar").text("Nectar: "+this.types.nectar.total);
		}else if(items.types.stuff[items.selectedItem.id].display.split(" ")[1].toLowerCase()=="candypop"){
			items.useFlower(items.selectedItem, clr);
		}
	},
	
	select: function(itm){
		$(".nectar").css('background','');
		$(".bombs").css('background','');
		$(".candypop").css('background','');
		
		if(items.selectedItem==itm)
			items.selectedItem='';
		else{
			items.selectedItem=itm;
			if(itm=="nectar"){
				$("."+itm).css('background','#CCCCCC');
			}else{
				$(itm).css('background','#CCCCCC');
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
		$("#item15").addClass("canShow");
	},
	giveNectar: function(){
		this.types.nectar.total+=1;
		$(".nectar").text("Nectar: "+this.types.nectar.total);
		$("#item16").addClass("canShow");
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
		
		$("#item45").addClass("canShow");
		
		this.types.pellets[Object.size(this.types.pellets)]={
			color: colors[explore.batman(0,colors.length-1)],
			numNeeded: explore.batman((3*explore.questArea),(5*explore.questArea))
		}
		
		$(".pellets").append("<div>"+this.types.pellets[Object.size(this.types.pellets)-1].color+" "+this.types.pellets[Object.size(this.types.pellets)-1].numNeeded+"</div>");
	},
	
	useFlower: function(itm, onClr){
		var thing=itm.id;
		var clr=this.types.stuff[thing].display.split(" ")[0].toLowerCase();
		itm.remove();
		
		if(!pikmin.party[clr].hadBefore){
			var tmpPic=$("#img"+clr).html();
			$("#discovery").html("Discovered new Pikmin<br/>"+tmpPic);
			setTimeout('$("#discovery").html("");',5000);
			
			pikmin.party[clr].hadBefore=true;
			pikmin.totalUpdate();
			pikmin.show(clr);
		}
		
		for(var i=0;i<20;i++){
			pikmin.change(onClr, clr);
		}
		
		this.delStuff(thing);
		items.selectedItem='';
		$("#btnRndFlower").hide();
	},
	useOnion: function(itm){
		var thing=itm.id;
		var clr=this.types.stuff[thing].display.split(" ")[0].toLowerCase();
		itm.remove();
		
		if(clr=="black")
			clr="rock";
		
		pikmin.give(clr,"leaf");
		pikmin.show(clr);
		
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
		}else if(typeN=="flower"){
			extraStuff=" style='cursor: pointer;' class='candypop'";
		}
		
		$(".stuff").append("<div id='"+(Object.size(this.types.stuff)-1)+"' "+extraStuff+">"+displayN+"</div>");
		
		if(typeN=="flower"){
			$(".candypop").off('click');
			$(".candypop").on('click',function(){
				items.select(this);
				if(items.types.stuff[items.selectedItem.id].display.split(" ")[1].toLowerCase()=="candypop"){
					$("#btnRndFlower").show();
					$("#btnRndNectar").hide();
				}else
					$("#btnRndFlower").hide();
			});
		}
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