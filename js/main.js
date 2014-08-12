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
		$("#redBlock").html("<b>Leaf:</b> "+pikmin.party.red.numLeaf+"<br/><b>Bud:</b> "+pikmin.party.red.numBud+"<br/><b>Flower:</b> "+pikmin.party.red.numFlower);
		$("#yellowBlock").html("<b>Leaf:</b> "+pikmin.party.yellow.numLeaf+"<br/><b>Bud:</b> "+pikmin.party.yellow.numBud+"<br/><b>Flower:</b> "+pikmin.party.yellow.numFlower);
		$("#blueBlock").html("<b>Leaf:</b> "+pikmin.party.blue.numLeaf+"<br/><b>Bud:</b> "+pikmin.party.blue.numBud+"<br/><b>Flower:</b> "+pikmin.party.blue.numFlower);
		$("#purpleBlock").html("<b>Leaf:</b> "+pikmin.party.purple.numLeaf+"<br/><b>Bud:</b> "+pikmin.party.purple.numBud+"<br/><b>Flower:</b> "+pikmin.party.purple.numFlower);
		$("#whiteBlock").html("<b>Leaf:</b> "+pikmin.party.white.numLeaf+"<br/><b>Bud:</b> "+pikmin.party.white.numBud+"<br/><b>Flower:</b> "+pikmin.party.white.numFlower);
		$("#rockBlock").html("<b>Leaf:</b> "+pikmin.party.rock.numLeaf+"<br/><b>Bud:</b> "+pikmin.party.rock.numBud+"<br/><b>Flower:</b> "+pikmin.party.rock.numFlower);
		$("#pinkBlock").html("<b>Leaf:</b> "+pikmin.party.pink.numLeaf+"<br/><b>Bud:</b> "+pikmin.party.pink.numBud+"<br/><b>Flower:</b> "+pikmin.party.pink.numFlower);
	}
};