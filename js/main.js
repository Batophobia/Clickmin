var main = {
	init: function(){
		this.load();
		pikmin.init();
		items.init();
		explore.init();
		farm.init();
		store.init();
		
		if(!team.party.charlie.inParty)
			main.timerID = window.setInterval(function(){main.tick()}, 100);
		
		$(".genTopic").on('click', function(){
			var hlpNum=this.id;
			hlpNum=hlpNum.substring(5);
			if(main.helpID!=hlpNum){
				main.helpID=hlpNum;
				$(".helpText").hide();
				$(".helpTopic").hide();
				$("#topic"+hlpNum+" .canShow").show();
				$("#tophelp"+hlpNum).show();
			}
		});
		$(".helpTopic").on('click', function(){
			var hlpNum=this.id;
			hlpNum=hlpNum.substring(4);
			$(".helpText").hide();
			$("#help"+hlpNum).show();
		});
		$(".hlpClose").on('click', function(){
			$(".helpMenu").toggle();
		});
		$(window).keydown(function(evt) {
			$(".plusNum").css('text-decoration', '');
			main.keyDown=evt.which;
			$("#plus"+main.keyDown).css('text-decoration', 'underline');
		}).keyup(function(evt) {
			main.keyDown=0;
			$(".plusNum").css('text-decoration', '');
		});
	},
	helpID: 0,
	timerID: 0,
	counter: 0,
	keyDown: 0,
	lastTick: new Date(),
	
	tick : function(){
		now = new Date();
		var elapsedTime = (now.getTime() - main.lastTick.getTime());
		var delay=100;
		
		if(team.party.charlie.inParty)
			delay=50;
		
		if(elapsedTime>delay){
			for(var i=0;i<Math.floor(elapsedTime/delay);i++){
				pikmin.tick();
				explore.tick();
				team.tick();
				farm.tick();
				store.tick();
				
				this.updateDisplay();
				this.save();
				this.counter++;
			}
		}else{
			pikmin.tick();
			explore.tick();
			team.tick();
			farm.tick();
			store.tick();
			
			this.updateDisplay();
			this.save();
			this.counter++;
		}
		main.lastTick = new Date();
	},
	
	updateDisplay: function(){
		pikmin.updateDisplay("red");
		pikmin.updateDisplay("yellow");
		pikmin.updateDisplay("blue");
		pikmin.updateDisplay("purple");
		pikmin.updateDisplay("white");
		pikmin.updateDisplay("rock");
		pikmin.updateDisplay("pink");
	},
	
	save : function(){
		var data = {'pikmin':{},'items':{},'explore':{},'team':{},'farm':{},'store':{}};
		for(var group in pikmin.party){
			if(group=="total")
				data['pikmin'][group] = pikmin.party.total;
			else{
				data['pikmin'][group] = {
					hadBefore : pikmin.party[group].hadBefore,
					numLeaf : pikmin.party[group].numLeaf + pikmin.squad[group].numLeaf,
					numBud : pikmin.party[group].numBud + pikmin.squad[group].numBud,
					numFlower : pikmin.party[group].numFlower + pikmin.squad[group].numFlower
				}
			}
		}
		for(var group in items.types){
			if(group=="stuff"){
				data['items'][group]={};
				for(var thing in items.types[group]){
					data['items'][group][thing]=(items.types[group][thing]);
				}
			}else if(group=="pellets"){
				data['items'][group]={};
				for(var thing in items.types.pellets){
					data['items'][group][thing]={
						num: items.types.pellets[thing].num
					}
				}
			}else{
				data['items'][group] = {
					total : items.types[group].total
				}
			}
		}
		for(var group in team.party){
			data['team'][group] = {
				inParty: team.party[group].inParty
			}
		}
		for(var group in store.items){
			data['store'][group] = {
				level: store.items[group].level
			}
		}
		for(var group in farm.pikmn){
			data['farm'][group] = {
				num: farm.pikmn[group].num
			}
		}
		for(var group in explore.places){
			data['explore'][group] = {
				canGo: explore.places[group].canGo,
				timesBeat: explore.places[group].timesBeat
			}
		}
		localStorage["save"] = JSON.stringify(data);
	},
	
	load : function(){
		if('save' in localStorage){
			var data = JSON.parse(localStorage['save']);
		}else{
			items.types.stuff[0]={
				display: "Red Onion",
				numNeeded: 0,
				type: "onion"
			};
			return;
		}
		for(var group in items.types){
			if(group in data['items']){
				if(group=="stuff"){
					for(var thing in data['items'][group]){
						items.types[group][thing]=data['items'][group][thing];
					}
				}else if(group=="pellets"){
					for(var thing in data['items'][group]){
						items.types.pellets[thing].num=data['items'][group][thing].num;
					}
				}else{
					items.types[group].total = data.items[group].total;
				}
			}
		}
		for(var group in team.party){
			if(data.team[group].inParty)
				team.party[group].init();
		}
		for(var group in pikmin.party){
			if(group in data['pikmin']){
				if(group=="total")
					pikmin.party[group] = data.pikmin[group];
				else{
					pikmin.party[group].numLeaf = data.pikmin[group].numLeaf;
					pikmin.party[group].numBud = data.pikmin[group].numBud;
					pikmin.party[group].numFlower = data.pikmin[group].numFlower;
					pikmin.party[group].hadBefore = data.pikmin[group].hadBefore;
				}
			}
		}
		for(var group in explore.places){
			if(group in data['explore']){
				explore.places[group].canGo= data.explore[group].canGo;
				explore.places[group].timesBeat= data.explore[group].timesBeat;
			}
		}
		for(var group in farm.pikmn){
			if(group in data['farm']){
				farm.pikmn[group].num= data.farm[group].num;
			}
		}
		for(var group in store.items){
			if(group in data['store']){
				store.items[group].level=data.store[group].level;
			}
		}
	},
	
	alrt: function(input){
		var alert = $("<div class='alert'>" + input + "</div>");
		$('#alerts').append(alert);
		setTimeout(function(){
			alert.fadeOut('slow',function(){
				$(this).remove();
			});
		},3000);
	}
};

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};