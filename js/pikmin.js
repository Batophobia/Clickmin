var pikmin = {
	party:{
		total:0,
		red:{
			display: "Red",
			numLeaf: 0,
			numBud: 0,
			numFlower: 0,
			hadBefore: false,
			buttonDelay: 1
		},
		yellow:{
			display: "Yellow",
			numLeaf:0,
			numBud:0,
			numFlower:0,
			hadBefore: false,
			buttonDelay: 1
		},
		blue:{
			display: "Blue",
			numLeaf:0,
			numBud:0,
			numFlower:0,
			hadBefore: false,
			buttonDelay: 1
		},
		purple:{
			display: "Purple",
			numLeaf:0,
			numBud:0,
			numFlower:0,
			hadBefore: false,
			buttonDelay: 1
		},
		white:{
			display: "White",
			numLeaf:0,
			numBud:0,
			numFlower:0,
			hadBefore: false,
			buttonDelay: 1
		},
		rock:{
			display: "Rock",
			numLeaf:0,
			numBud:0,
			numFlower:0,
			hadBefore: false,
			buttonDelay: 1
		},
		pink:{
			display: "Winged",
			numLeaf:0,
			numBud:0,
			numFlower:0,
			hadBefore: false,
			buttonDelay: 1
		}
	},
	
	squad:{
		total:0,
		max:100,
		red:{
			canBomb: false,
			strength: 15,
			speed: 2,
			carry: 1,
			numLeaf: 0,
			numBud: 0,
			numFlower: 0
		},
		yellow:{
			canBomb:true,
			strength: 10,
			speed: 2,
			carry: 1,
			numLeaf:0,
			numBud:0,
			numFlower:0
		},
		blue:{
			canBomb:false,
			strength: 10,
			speed: 2,
			carry: 1,
			numLeaf:0,
			numBud:0,
			numFlower:0
		},
		purple:{
			canBomb:false,
			strength: 20,
			speed: 1,
			carry: 10,
			numLeaf:0,
			numBud:0,
			numFlower:0
		},			//Purple and White made by flower only
		white:{
			canBomb:false,
			strength: 10,
			speed: 3,
			carry: 1,
			numLeaf:0,
			numBud:0,
			numFlower:0
		},
		rock:{
			canBomb:false,
			strength: 15,
			speed: 2,
			carry: 1,
			numLeaf:0,
			numBud:0,
			numFlower:0
		},
		pink:{
			canBomb:false,
			strength: 7,
			speed: 2,
			carry: 1,
			numLeaf:0,
			numBud:0,
			numFlower:0
		},
		bulbmin:{
			canBomb:false,
			strength: 7,
			speed: 2,
			carry: 1,
			numLeaf:0,
			numBud:0,
			numFlower:0
		},
		
		killAllBut: function(clr){
			if(clr!="red"){
				this.red.numLeaf=0;
				this.red.numBud=0;
				this.red.numFlower=0;
			}if(clr!="yellow"){
				this.yellow.numLeaf=0;
				this.yellow.numBud=0;
				this.yellow.numFlower=0;
			}if(clr!="blue"){
				this.blue.numLeaf=0;
				this.blue.numBud=0;
				this.blue.numFlower=0;
			}if(clr!="purple"){
				this.purple.numLeaf=0;
				this.purple.numBud=0;
				this.purple.numFlower=0;
			}if(clr!="white"){
				this.white.numLeaf=0;
				this.white.numBud=0;
				this.white.numFlower=0;
			}if(clr!="rock"){
				this.rock.numLeaf=0;
				this.rock.numBud=0;
				this.rock.numFlower=0;
			}if(clr!="pink"){
				this.pink.numLeaf=0;
				this.pink.numBud=0;
				this.pink.numFlower=0;
			}
			this.updateSquadTotal();
		},
		
		reset: function(){
			pikmin.squad.total=0;
			pikmin.party.red.numLeaf  +=pikmin.squad.red.numLeaf;
			pikmin.party.red.numBud   +=pikmin.squad.red.numBud;
			pikmin.party.red.numFlower+=pikmin.squad.red.numFlower;
			pikmin.party.yellow.numLeaf  +=pikmin.squad.yellow.numLeaf;
			pikmin.party.yellow.numBud   +=pikmin.squad.yellow.numBud;
			pikmin.party.yellow.numFlower+=pikmin.squad.yellow.numFlower;
			pikmin.party.blue.numLeaf  +=pikmin.squad.blue.numLeaf;
			pikmin.party.blue.numBud   +=pikmin.squad.blue.numBud;
			pikmin.party.blue.numFlower+=pikmin.squad.blue.numFlower;
			pikmin.party.purple.numLeaf  +=pikmin.squad.purple.numLeaf;
			pikmin.party.purple.numBud   +=pikmin.squad.purple.numBud;
			pikmin.party.purple.numFlower+=pikmin.squad.purple.numFlower;
			pikmin.party.white.numLeaf  +=pikmin.squad.white.numLeaf;
			pikmin.party.white.numBud   +=pikmin.squad.white.numBud;
			pikmin.party.white.numFlower+=pikmin.squad.white.numFlower;
			pikmin.party.rock.numLeaf  +=pikmin.squad.rock.numLeaf;
			pikmin.party.rock.numBud   +=pikmin.squad.rock.numBud;
			pikmin.party.rock.numFlower+=pikmin.squad.rock.numFlower;
			pikmin.party.pink.numLeaf  +=pikmin.squad.pink.numLeaf;
			pikmin.party.pink.numBud   +=pikmin.squad.pink.numBud;
			pikmin.party.pink.numFlower+=pikmin.squad.pink.numFlower;
			
			this.killAllBut("");
		},
		
		updateSquadTotal: function(){
			pikmin.squad.total=0;
			pikmin.squad.total+=this.squadColorNum("red");
			pikmin.squad.total+=this.squadColorNum("yellow");
			pikmin.squad.total+=this.squadColorNum("blue");
			pikmin.squad.total+=this.squadColorNum("purple");
			pikmin.squad.total+=this.squadColorNum("white");
			pikmin.squad.total+=this.squadColorNum("rock");
			pikmin.squad.total+=this.squadColorNum("pink");
			pikmin.squad.total+=this.squadColorNum("bulbmin");
		},
		
		kill: function(num, effect){
			for(i=0;i<num;i++){
				var numToMurder=explore.batman(0,this.total);
				var rndSurvive = explore.batman(0,10);
				
				if(effect!="fire")
					numToMurder=this.checkForDeath("red",numToMurder,rndSurvive,effect);
				else
					numToMurder-=this.squadColorNum("red");
					
				if(numToMurder<0)
					continue;
				
				if(effect!="electric")
					numToMurder=this.checkForDeath("yellow",numToMurder,rndSurvive,effect);
				else
					numToMurder-=this.squadColorNum("yellow");
					
				if(numToMurder<0)
					continue;
				
				if(effect!="water")
					numToMurder=this.checkForDeath("blue",numToMurder,rndSurvive,effect);
				else
					numToMurder-=this.squadColorNum("blue");
					
				if(numToMurder<0)
					continue;
				
				numToMurder=this.checkForDeath("purple",numToMurder,rndSurvive,effect);
					
				if(numToMurder<0)
					continue;
				
				if(effect!="poison")
					numToMurder=this.checkForDeath("white",numToMurder,rndSurvive,effect);
				else
					numToMurder-=this.squadColorNum("white");
					
				if(numToMurder<0)
					continue;
				
				if(effect!="rock")
					numToMurder=this.checkForDeath("rock",numToMurder,rndSurvive,effect);
				else
					numToMurder-=this.squadColorNum("rock");
					
				if(numToMurder<0)
					continue;
				
				numToMurder=this.checkForDeath("pink",numToMurder,rndSurvive,effect);
			}
		},
		
		checkForDeath: function(clr, numKill, rndSurvive, effect){
			if(clr==enemy.monsterList["0"].halfAtk && explore.batman(1,10)<5)
				numKill-=this.squadColorNum(clr);
			else{
				var bonus=1;
				if(clr==enemy.monsterList["0"].extraDmgTo)
					bonus=2;
				if(numKill<this[clr].numLeaf*bonus){
					this[clr].numLeaf-=1;
					this.total-=1;
					return -1;
				}
				numKill-=this[clr].numLeaf;
				if(numKill<this[clr].numBud*bonus){
					if(rndSurvive>2){
						this[clr].numBud-=1;
						this.total-=1;
						return -1;
					}
				}
				numKill-=this[clr].numBud;
				if(numKill<this[clr].numFlower*bonus){
					if(rndSurvive>3){
						this[clr].numFlower-=1;
						this.total-=1;
						return -1;
					}
				}
				numKill-=this[clr].numFlower;
			}
			return numKill;
		},
		
		squadColorNum: function(clr){
			return (this[clr].numLeaf+this[clr].numBud+this[clr].numFlower);
		},
		
		strength: function(){
			var intStr=0, bonus=1;
			if(enemy.monsterList["0"].extraDmgFrom=="red")
				bonus=1.3;
			intStr += pikmin.squad.red.strength * (pikmin.squad.squadColorNum("red")) * bonus;
			
			bonus=1;
			if(enemy.monsterList["0"].extraDmgFrom=="yellow")
				bonus=1.3;
			
			intStr += pikmin.squad.yellow.strength * (pikmin.squad.squadColorNum("yellow")) * bonus;
			
			bonus=1;
			if(enemy.monsterList["0"].extraDmgFrom=="blue")
				bonus=1.3;
			
			intStr += pikmin.squad.blue.strength * (pikmin.squad.squadColorNum("blue")) * bonus;
			
			bonus=1;
			if(enemy.monsterList["0"].extraDmgFrom=="purple")
				bonus=1.3;
			
			intStr += pikmin.squad.purple.strength * (pikmin.squad.squadColorNum("purple")) * bonus;
			
			bonus=1;
			if(enemy.monsterList["0"].extraDmgFrom=="white")
				bonus=1.3;
			
			intStr += pikmin.squad.white.strength * (pikmin.squad.squadColorNum("white")) * bonus;
			
			bonus=1;
			if(enemy.monsterList["0"].extraDmgFrom=="rock")
				bonus=1.3;
			
			intStr += pikmin.squad.rock.strength * (pikmin.squad.squadColorNum("rock")) * bonus;
			
			bonus=1;
			if(enemy.monsterList["0"].extraDmgFrom=="pink")
				bonus=1.3;
			
			intStr += pikmin.squad.pink.strength * (pikmin.squad.squadColorNum("pink")) * bonus;
			
			return intStr;
		}
	},
	
	promote: function(clr){
		var clrs=[], type;
		
		if(clr==""){
			if((this.checkNum("red")-this.party.red.numFlower)>0)
				clrs.push("red");
			if((this.checkNum("yellow")-this.party.yellow.numFlower)>0)
				clrs.push("yellow");
			if((this.checkNum("blue")-this.party.blue.numFlower)>0)
				clrs.push("blue");
			if((this.checkNum("purple")-this.party.purple.numFlower)>0)
				clrs.push("purple");
			if((this.checkNum("white")-this.party.white.numFlower)>0)
				clrs.push("white");
			if((this.checkNum("rock")-this.party.rock.numFlower)>0)
				clrs.push("rock");
			if((this.checkNum("pink")-this.party.pink.numFlower)>0)
				clrs.push("pink");
			
			clr=clrs[explore.batman(0,clrs.length)];
			clrs=[];
		}
		
		type=explore.batman(0,this.party[clr].numLeaf+this.party[clr].numBud);
		if(type < this.party[clr].numLeaf){
			pikmin.party[clr].numLeaf--;
			pikmin.party[clr].numBud++;
		}else{
			pikmin.party[clr].numBud--;
			pikmin.party[clr].numFlower++;
		}
	},
	change: function(clr, toClr){
		var clrs=[], type;
		
		if(clr==""){
			if((this.checkNum("red"))>0)
				clrs.push("red");
			if((this.checkNum("yellow"))>0)
				clrs.push("yellow");
			if((this.checkNum("blue"))>0)
				clrs.push("blue");
			if((this.checkNum("rock"))>0)
				clrs.push("rock");
			if((this.checkNum("pink"))>0)
				clrs.push("pink");
			
			clr=clrs[explore.batman(0,clrs.length)];
			clrs=[];
		}
		
		if(this.party[clr].numLeaf>1){
			pikmin.party[clr].numLeaf--;
			pikmin.party[toClr].numLeaf++;
		}
		else if(this.party[clr].numBud>1){
			pikmin.party[clr].numBud--;
			pikmin.party[toClr].numBud++;
		}
		else{
			pikmin.party[clr].numFlower--;
			pikmin.party[toClr].numFlower++;
		}
	},
	
	totalUpdate: function(){
		this.party.total=0;
		this.party.total+=this.checkNum("red");
		this.party.total+=this.checkNum("yellow");
		this.party.total+=this.checkNum("blue");
		this.party.total+=this.checkNum("purple");
		this.party.total+=this.checkNum("white");
		this.party.total+=this.checkNum("rock");
		this.party.total+=this.checkNum("pink");
	},
	
	tick: function(){
		
	},
	
	give: function(clr, type){
		if(type=="bud")
			this.party[clr].numBud+=1;
		else if(type=="flower")
			this.party[clr].numFlower+=1;
		else
			this.party[clr].numLeaf+=1;
		
		this.totalUpdate();
		
		if(this.party.total>25 && !explore.isOnMap)
			$("#btnMap").show();
		
		farm.checkButtons(clr);
	},
	
	checkNum: function(clr){
		return (this.party[clr].numLeaf+this.party[clr].numBud+this.party[clr].numFlower);
	},
	
	init : function(){
		if(this.party.red.hadBefore)
			this.show("red");
		if(this.party.yellow.hadBefore)
			this.show("yellow");
		if(this.party.blue.hadBefore)
			this.show("blue");
		if(this.party.purple.hadBefore)
			this.show("purple");
		if(this.party.white.hadBefore)
			this.show("white");
		if(this.party.rock.hadBefore)
			this.show("rock");
		if(this.party.pink.hadBefore)
			this.show("pink");
		
		$(".btnPluck").on('click',function(){
			var color = this.id.substring(8);
			pikmin.give(color,'leaf');
			$("#btnPluck"+color).attr("disabled", "disabled");
			setTimeout('$("#btnPluck'+color+'").removeAttr("disabled");',pikmin.party[color].buttonDelay*50);
		});
	},
	
	show : function(input){
		if(input!="purple" && input!="white"){
			$("#btnPluck"+input).show();
			$("#btnPluck"+input).removeAttr("disabled");
		}
		
		if(input=="yellow")
			$("#item2").addClass("canShow");
		else if(input=="blue")
			$("#item3").addClass("canShow");
		else if(input=="purple")
			$("#item4").addClass("canShow");
		else if(input=="white")
			$("#item5").addClass("canShow");
		else if(input=="rock")
			$("#item6").addClass("canShow");
		else if(input=="pink")
			$("#item7").addClass("canShow");
		else
			$("#item1").addClass("canShow");
		
		//if(!explore.isOnMap)
		//	$("#btnMap").show();
		$("#"+input+"Block").show();
		$("#"+input+"Squad").show();
		pikmin.party[input].hadBefore=true;
	},
	
	updateDisplay : function(clr){
		$("#"+clr+"Block").html("<div class='head'>"+pikmin.party[clr].display+"</div><b>Leaf:</b> "+pikmin.party[clr].numLeaf+"<br/><b>Bud:</b> "+pikmin.party[clr].numBud+"<br/><b>Flower:</b> "+pikmin.party[clr].numFlower);
	}
};