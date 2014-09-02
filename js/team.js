var team = {
	party: {
		koppad: {
			display: "KopPad",
			inParty: false,
			init: function(){
				this.inParty=true;
				$("#item12").addClass("canShow");
				$("#btnHelp").show();
				$("#btnHelp").on('click',function(){
					$(".helpMenu").toggle();
				});
			}
		},
		alph: {
			display: "Alph",
			inParty: false,
			counterMod: 100,
			init: function(){
				this.inParty=true;
				$("#item24").addClass("canShow");
			},
			
			pluck: function(){
				if(!explore.isQuesting && this.inParty){
					var optns=[];
					if(pikmin.party.red.hadBefore)
						optns.push("red");
					if(pikmin.party.yellow.hadBefore)
						optns.push("yellow");
					if(pikmin.party.blue.hadBefore)
						optns.push("blue");
					if(pikmin.party.rock.hadBefore)
						optns.push("rock");
					if(pikmin.party.pink.hadBefore)
						optns.push("pink");
					
					pikmin.party[optns[explore.batman(0,optns.length)]].numLeaf++;
				}
			},
		},
		brittany: {
			display: "Brittany",
			inParty: false,
			counterMod: 100,
			init: function(){
				this.inParty=true;
				$("#item25").addClass("canShow");
			}//Rarely give Nectar
		},
		charlie: {
			display: "Charlie",
			inParty: false,
			init: function(){
				this.inParty=true;
				$("#item26").addClass("canShow");
			}//Speed up tick
		},
		louie: {
			display: "Louie",
			inParty: false,
			init: function(){
				this.inParty=true;
				$("#item27").addClass("canShow");
			}//Increased damage
		},
		olimar: {
			display: "Olimar",
			inParty: false,
			init: function(){
				this.inParty=true;
				$("#item28").addClass("canShow");
			}//Caves on maps
		},
		president: {
			display: "President",
			inParty: false,
			init: function(){
				this.inParty=true;
				$("#item29").addClass("canShow");
			}//Open store
		}
	},
	
	tick: function(){
		if(this.party.alph.inParty && main.counter%this.party.alph.counterMod==0){
			this.party.alph.pluck();
		}
	},
	
	find: function(input){
		this.party[input].init();
	}
};