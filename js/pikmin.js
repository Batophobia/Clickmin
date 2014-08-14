var pikmin = {
	party:{
		total:0,
		red:{
			display: "Red",
			canBomb: false,
			strength: 15,
			speed: 2,
			carry: 1,
			numLeaf: 0,
			numBud: 0,
			numFlower: 0
		},
		yellow:{
			display: "Yellow",
			canBomb:true,
			strength: 10,
			speed: 2,
			carry: 1,
			numLeaf:0,
			numBud:0,
			numFlower:0
		},
		blue:{
			display: "Blue",
			canBomb:false,
			strength: 10,
			speed: 2,
			carry: 1,
			numLeaf:0,
			numBud:0,
			numFlower:0
		},
		purple:{
			display: "Purple",
			canBomb:false,
			strength: 20,
			speed: 1,
			carry: 10,
			numLeaf:0,
			numBud:0,
			numFlower:0
		},
		white:{
			display: "White",
			canBomb:false,
			strength: 10,
			speed: 3,
			carry: 1,
			numLeaf:0,
			numBud:0,
			numFlower:0
		},
		rock:{
			display: "Rock",
			canBomb:false,
			strength: 15,
			speed: 2,
			carry: 1,
			numLeaf:0,
			numBud:0,
			numFlower:0
		},
		pink:{
			display: "Winged",
			canBomb:false,
			strength: 7,
			speed: 2,
			carry: 1,
			numLeaf:0,
			numBud:0,
			numFlower:0
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
	},
	
	updateDisplay : function(clr){
		$("#"+clr+"Block").html("<div class='head'>"+pikmin.party[clr].display+"</div><b>Leaf:</b> "+pikmin.party[clr].numLeaf+"<br/><b>Bud:</b> "+pikmin.party[clr].numBud+"<br/><b>Flower:</b> "+pikmin.party[clr].numFlower);
	}
};