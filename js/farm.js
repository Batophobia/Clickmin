var farm = {
	pikmn:{
		red:{
			display: "Red",
			num:0,
			delay: 10
		},
		yellow:{
			display: "Yellow",
			num:0,
			delay: 10
		},
		blue:{
			display: "Blue",
			num:0,
			delay: 10
		},
		purple:{
			display: "Purple",
			num:0,
			delay: 12
		},
		white:{
			display: "White",
			num:0,
			delay: 8
		},
		rock:{
			display: "Rock",
			num:0,
			delay: 10
		},
		pink:{
			display: "Winged",
			num:0,
			delay: 8
		}
	},
	
	tick: function(){
		
	},
	
	assign: function(clr, number){
		if(pikmin.checkNum(clr)<number+3)
			return 0;
		
		for(var i=0; i<number; i++){
			if(pikmin.party[clr].numLeaf>1)
				pikmin.party[clr].numLeaf--;
			else if(pikmin.party[clr].numBud>1)
				pikmin.party[clr].numBud--;
			else if(pikmin.party[clr].numFlower>1)
				pikmin.party[clr].numFlower--;
		}
		
		this.pikmn[clr].num += number;
		this.updateDisplay(clr);
		this.checkButtons(clr);
	},
	
	checkButtons: function(clr){
		if(pikmin.checkNum(clr)<=103)
			$("#btnWorker"+clr+"_100").hide();
		else
			$("#btnWorker"+clr+"_100").show();
		
		if(pikmin.checkNum(clr)<=13)
			$("#btnWorker"+clr+"_10").hide();
		else
			$("#btnWorker"+clr+"_10").show();
		
		if(pikmin.checkNum(clr)<=3)
			$("#btnWorker"+clr+"_1").hide();
		else
			$("#btnWorker"+clr+"_1").show();
	},
	
	init : function(){
		for(var group in this.pikmn){
			$("#numWorkers"+group).text(this.pikmn[group].display+" Workers: "+this.pikmn[group].num);
			this.checkButtons(group);
		}
		$(".btnWorker").on('click',function(){
			var btnInfo=this.id.split("_");
			var clr=btnInfo[0].substring(9);
			var num=parseInt(btnInfo[1]);
			
			farm.assign(clr, num);
		});
	},
	
	updateDisplay : function(clr){
		$("#numWorkers"+clr).text(this.pikmn[clr].display+" Workers: "+this.pikmn[clr].num);
	}
};