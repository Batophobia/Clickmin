var pikmin = {
	party:{
		total:0,
		red:{
			display: "Red",
			numLeaf: 0,
			numBud: 0,
			numFlower: 0
		},
		yellow:{
			display: "Yellow",
			numLeaf:0,
			numBud:0,
			numFlower:0
		},
		blue:{
			display: "Blue",
			numLeaf:0,
			numBud:0,
			numFlower:0
		},
		purple:{
			display: "Purple",
			numLeaf:0,
			numBud:0,
			numFlower:0
		},
		white:{
			display: "White",
			numLeaf:0,
			numBud:0,
			numFlower:0
		},
		rock:{
			display: "Rock",
			numLeaf:0,
			numBud:0,
			numFlower:0
		},
		pink:{
			display: "Winged",
			numLeaf:0,
			numBud:0,
			numFlower:0
		}
	},
	
	squad:{
		total:0,
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
		
		kill: function(num, effect){
			for(i=0;i<num;i++){
				var numToMurder=explore.batman(0,this.total);
				var rndSurvive = explore.batman(0,10);
				
				if(effect!="fire")
					numToMurder=this.checkForDeath("red",numToMurder,rndSurvive,effect);
				else
					numToMurder-=this.squadColorNum("red");
					
				if(numToMurder<=0)
					return;
				
				if(effect!="electric")
					numToMurder=this.checkForDeath("yellow",numToMurder,rndSurvive,effect);
				else
					numToMurder-=this.squadColorNum("yellow");
					
				if(numToMurder<=0)
					return;
				
				if(effect!="water")
					numToMurder=this.checkForDeath("blue",numToMurder,rndSurvive,effect);
				else
					numToMurder-=this.squadColorNum("blue");
					
				if(numToMurder<=0)
					return;
				
				numToMurder=this.checkForDeath("purple",numToMurder,rndSurvive,effect);
					
				if(numToMurder<=0)
					return;
				
				if(effect!="poison")
					numToMurder=this.checkForDeath("white",numToMurder,rndSurvive,effect);
				else
					numToMurder-=this.squadColorNum("white");
					
				if(numToMurder<=0)
					return;
				
				if(effect!="rock")
					numToMurder=this.checkForDeath("rock",numToMurder,rndSurvive,effect);
				else
					numToMurder-=this.squadColorNum("rock");
					
				if(numToMurder<=0)
					return;
				
				numToMurder=this.checkForDeath("pink",numToMurder,rndSurvive,effect);
			}
		},
		
		checkForDeath: function(clr, numKill, chncSurvive, effect){
			if(clr==enemy.monsterList["0"].halfAtk && explore.batman(1,10)<5)
				numKill-=this.squadColorNum(clr);
			else{
				if(numKill<this[clr].numLeaf){
					this[clr].numLeaf-=1;
					this.total-=1;
					return;
				}
				numKill-=this[clr].numLeaf;
				if(numKill<this[clr].numBud){
					if(rndSurvive>2){
						this[clr].numBud-=1;
						this.total-=1;
						return;
					}
				}
				numKill-=this[clr].numBud;
				if(numKill<this[clr].numFlower){
					if(rndSurvive>3){
						this[clr].numFlower-=1;
						this.total-=1;
						return;
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
			var intStr=0;
			
			intStr += pikmin.squad.red.strength * (pikmin.squad.squadColorNum("red"));
			intStr += pikmin.squad.yellow.strength * (pikmin.squad.squadColorNum("yellow"));
			intStr += pikmin.squad.blue.strength * (pikmin.squad.squadColorNum("blue"));
			intStr += pikmin.squad.purple.strength * (pikmin.squad.squadColorNum("purple"));
			intStr += pikmin.squad.white.strength * (pikmin.squad.squadColorNum("white"));
			intStr += pikmin.squad.rock.strength * (pikmin.squad.squadColorNum("rock"));
			intStr += pikmin.squad.pink.strength * (pikmin.squad.squadColorNum("pink"));
			
			return intStr;
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
	
	addGuys: function(){
		if(!explore.isQuesting){
			if(this.checkNum("red")>0)
				this.party.red.numLeaf++;
			if(this.checkNum("yellow")>0)
				this.party.yellow.numLeaf++;
			if(this.checkNum("blue")>0)
				this.party.blue.numLeaf++;
			if(this.checkNum("rock")>0)
				this.party.rock.numLeaf++;
			if(this.checkNum("pink")>0)
				this.party.pink.numLeaf++;
		}
	},
	
	give: function(clr, type){
		if(type=="bud")
			this.party[clr].numBud+=1;
		else if(type=="flower")
			this.party[clr].numFlower+=1;
		else
			this.party[clr].numLeaf+=1;
	},
	
	checkNum: function(clr){
		return (this.party[clr].numLeaf+this.party[clr].numBud+this.party[clr].numFlower);
	},
	
	init : function(){
		if(this.checkNum("red")>0)
			this.show("red");
		if(this.checkNum("yellow")>0)
			this.show("yellow");
		if(this.checkNum("blue")>0)
			this.show("blue");
		if(this.checkNum("purple")>0)
			this.show("purple");
		if(this.checkNum("white")>0)
			this.show("white");
		if(this.checkNum("rock")>0)
			this.show("rock");
		if(this.checkNum("pink")>0)
			this.show("pink");
	},
	
	show : function(input){
		$("#"+input+"Block").show();
		$("#"+input+"Squad").show();
	},
	
	updateDisplay : function(clr){
		$("#"+clr+"Block").html("<div class='head'>"+pikmin.party[clr].display+"</div><b>Leaf:</b> "+pikmin.party[clr].numLeaf+"<br/><b>Bud:</b> "+pikmin.party[clr].numBud+"<br/><b>Flower:</b> "+pikmin.party[clr].numFlower);
	}
};