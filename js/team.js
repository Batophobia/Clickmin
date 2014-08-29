var team = {
	koppad: {
		display: "KopPad",
		inParty: false,
		init: function(){
			this.inParty=true;
			$("#btnHelp").show();
			$("#btnHelp").on('click',function(){
				$(".helpMenu").toggle();
			});
		}
	},
	alph: {
		display: "Alph",
		inParty: false,
		init: function(){
			this.inParty=true;
		}
	},
	brittany: {
		display: "Brittany",
		inParty: false,
		init: function(){
			this.inParty=true;
		}
	},
	charlie: {
		display: "Charlie",
		inParty: false,
		init: function(){
			this.inParty=true;
		}
	},
	louie: {
		display: "Louie",
		inParty: false,
		init: function(){
			this.inParty=true;
		}
	},
	olimar: {
		display: "Olimar",
		inParty: false,
		init: function(){
			this.inParty=true;
		}
	},
	president: {
		display: "President",
		inParty: false,
		init: function(){
			this.inParty=true;
		}
	},
	
	find: function(input){
		this[input].init();
	}
};