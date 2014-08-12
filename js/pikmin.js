var pikmin = {
	party:{
		total:1,
		red:{
			display: "Red",
			canBomb: false,
			strength: 15,
			speed: 2,
			carry: 1,
			numLeaf: 1,
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
	
	init : function(){
		this.show("red");
	},
	
	show : function(input){
		$("#"+input+"Block").show();
	}
};