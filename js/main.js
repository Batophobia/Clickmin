var main = {
	init : function(){
		this.load();
		pikmin.init();
		items.init();
		explore.init();
		window.setInterval(function(){main.tick()}, 1000);
	},
	
	tick : function(){
		this.updateDisplay();
		pikmin.totalUpdate();
		this.save();
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
		var data = {'pikmin':{},'items':{}};
		for(var group in pikmin.party){
			if(group=="total")
				data['pikmin'][group] = pikmin.party.total;
			else{
				data['pikmin'][group] = {
					numLeaf : pikmin.party[group].numLeaf,
					numBud : pikmin.party[group].numBud,
					numFlower : pikmin.party[group].numFlower
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
				for(var thing in items.types[group]){
					data['items'][group][thing]=(items.types[group][thing]);
				}
			}else{
				data['items'][group] = {
					total : items.types[group].total,
					owned : items.types[group].owned
				}
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
				x: 0,
				y: 0,
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
						items.types[group][thing]=data['items'][group][thing];
					}
				}else{
					items.types[group].total = data.items[group].total;
					items.types[group].owned = data.items[group].owned;
				}
			}
		}
		for(var group in pikmin.party){
			if(group in data['pikmin']){
				if(group=="total")
					pikmin.party[group] = data.pikmin[group];
				else{
					pikmin.party[group].numLeaf = data.pikmin[group].numLeaf;
					pikmin.party[group].numBud = data.pikmin[group].numBud;
					pikmin.party[group].numFlower = data.pikmin[group].numFlower;
				}
			}
		}
	},
};

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};