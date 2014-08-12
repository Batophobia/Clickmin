var main = {
	init : function(){
		pikmin.init();
		items.init();
		window.setInterval(function(){main.tick()}, 1000);
	},
	
	tick : function(){
		this.updateDisplay();
	},
	
	updateDisplay: function(){
		$("#redBlock").text("Leaf: "+pikmin.party.red.numLeaf+"&emsp;Bud: "+pikmin.party.red.numBud+"&emsp;Flower: "+pikmin.party.red.numFlower);
		$("#yellowBlock").text("Leaf: "+pikmin.party.yellow.numLeaf+"&emsp;Bud: "+pikmin.party.yellow.numBud+"&emsp;Flower: "+pikmin.party.yellow.numFlower);
		$("#blueBlock").text("Leaf: "+pikmin.party.blue.numLeaf+"&emsp;Bud: "+pikmin.party.blue.numBud+"&emsp;Flower: "+pikmin.party.blue.numFlower);
		$("#purpleBlock").text("Leaf: "+pikmin.party.purple.numLeaf+"&emsp;Bud: "+pikmin.party.purple.numBud+"&emsp;Flower: "+pikmin.party.purple.numFlower);
		$("#whiteBlock").text("Leaf: "+pikmin.party.white.numLeaf+"&emsp;Bud: "+pikmin.party.white.numBud+"&emsp;Flower: "+pikmin.party.white.numFlower);
		$("#rockBlock").text("Leaf: "+pikmin.party.rock.numLeaf+"&emsp;Bud: "+pikmin.party.rock.numBud+"&emsp;Flower: "+pikmin.party.rock.numFlower);
		$("#pinkBlock").text("Leaf: "+pikmin.party.pink.numLeaf+"&emsp;Bud: "+pikmin.party.pink.numBud+"&emsp;Flower: "+pikmin.party.pink.numFlower);
	}
};