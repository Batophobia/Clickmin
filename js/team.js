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
					$(".helpTopic").hide();
					main.helpID="";
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
					
					var clr=optns[explore.batman(0,optns.length)]
					pikmin.party[clr].numLeaf++;
					farm.checkButtons(clr);
				}
			},
		},
		brittany: {
			display: "Brittany",
			inParty: false,
			counterMod: 100,
			odds: 5,
			init: function(){
				this.inParty=true;
				$("#item25").addClass("canShow");
			},
			
			synth: function(){
				if(!explore.isQuesting && this.inParty){
					if(explore.batman(0,100)<this.odds)
						items.giveNectar();
				}
			},
		},
		charlie: {
			display: "Charlie",
			inParty: false,
			init: function(){
				this.inParty=true;
				$("#item26").addClass("canShow");
				clearInterval(main.timerID);
				main.timerID = window.setInterval(function(){main.tick()}, 50);
			}
		},
		louie: {
			display: "Louie",
			inParty: false,
			perIncrease: 1,
			init: function(){
				this.inParty=true;
				$("#item27").addClass("canShow");
				this.perIncrease+=.1;
			},
			
			stronger: function(){
				this.perIncrease+=.1;
			}
		},
		olimar: {
			display: "Olimar",
			inParty: false,
			init: function(){
				this.inParty=true;
				$("#item28").addClass("canShow");
				$("#item56").addClass("canShow");
			},
			
			toCave: function(map){
				// Was going to add a cave per map (maybe multiples)
				//Possible future expansion
			}
		},
		president: {
			display: "President",
			inParty: false,
			init: function(){
				this.inParty=true;
				$("#item29").addClass("canShow");
				$(".store").show();
			}//Open store
		}
	},
	
	tick: function(){
		if(this.party.alph.inParty && main.counter%this.party.alph.counterMod==0){
			this.party.alph.pluck();
		}
		if(this.party.brittany.inParty && main.counter%this.party.brittany.counterMod==0){
			this.party.brittany.synth();
		}
	},
	
	find: function(input){
		this.party[input].init();
	}
};