var store = {
	items:{
		redFarm:		{
			display: "Farm Upgrade - Red Worker",
			inStock:false,
			price: "5r",
			level: 0,
			init: function(){
				farm.pikmn.red.delay-=farm.pikmn.red.level;
			}
		},
		yellowFarm:	{
			display: "Farm Upgrade - Yellow Worker",
			inStock:false,
			price: "5y",
			level: 0,
			init: function(){
				farm.pikmn.yellow.delay-=farm.pikmn.yellow.level;
			}
		},
		blueFarm:	{
			display: "Farm Upgrade - Blue Worker",
			inStock:false,
			price: "5b",
			level: 0,
			init: function(){
				farm.pikmn.blue.delay-=farm.pikmn.blue.level;
			}
		},
		rockFarm:	{
			display: "Farm Upgrade - Black Worker",
			inStock:false,
			price: "5k",
			level: 0,
			init: function(){
				farm.pikmn.rock.delay-=farm.pikmn.rock.level;
			}
		},
		pinkFarm:	{
			display: "Farm Upgrade - Pink Worker",
			inStock:false,
			price: "5p",
			level: 0,
			init: function(){
				farm.pikmn.pink.delay-=farm.pikmn.pink.level;
			}
		}
	},
	
	init : function(){
		for(var group in this.items){
			this.items[group].init();
			$(".storeStock").append("<div><span id='str"+group+"'></span> <button class='strBuy' id='buy"+group+"'>Buy</button></div>");
			this.refreshPrice(group);
		}
		$(".strBuy").on('click',function(){
			var itm=this.id.substring(3);
			store.buy(itm);
		});
	},
	
	tick: function(){
		
	},
	
	buy: function(itm){
		var arrPrice = this.getPrice(this.items[itm].price);
		
		if(items.types.pellets.red.num<arrPrice[0])
			return false;
		if(items.types.pellets.yellow.num<arrPrice[1])
			return false;
		if(items.types.pellets.blue.num<arrPrice[2])
			return false;
		if(items.types.pellets.rock.num<arrPrice[3])
			return false;
		if(items.types.pellets.pink.num<arrPrice[4])
			return false;
		if(items.types.coins.total<arrPrice[5])
			return false;
		
		items.types.pellets.red.num		-= arrPrice[0];
		items.types.pellets.yellow.num	-= arrPrice[1];
		items.types.pellets.blue.num	-= arrPrice[2];
		items.types.pellets.rock.num	-= arrPrice[3];
		items.types.pellets.pink.num	-= arrPrice[4];
		items.types.coins.total			-= arrPrice[5];
		
		this.items[itm].level++;
		//this.items[itm].inStock=false;
		this.refreshPrice(itm);
	},
	
	refreshPrice: function(itm){
		var arrPrice = this.getPrice(this.items[itm].price);
		var lvl=this.items[itm].level;
		var strOutput="";
		
		if(arrPrice[0]>0){
			strOutput="~"+Math.ceil(Math.pow(1.2,lvl)*arrPrice[0])+"r";
		}if(arrPrice[1]>0){
			strOutput="~"+Math.ceil(Math.pow(1.2,lvl)*arrPrice[1])+"y";
		}if(arrPrice[2]>0){
			strOutput="~"+Math.ceil(Math.pow(1.2,lvl)*arrPrice[2])+"b";
		}if(arrPrice[3]>0){
			strOutput="~"+Math.ceil(Math.pow(1.2,lvl)*arrPrice[3])+"k";
		}if(arrPrice[4]>0){
			strOutput="~"+Math.ceil(Math.pow(1.2,lvl)*arrPrice[4])+"p";
		}if(arrPrice[5]>0){
			strOutput="~"+Math.ceil(Math.pow(1.2,lvl)*arrPrice[5])+"c";
		}
		this.items[itm].price = strOutput.slice(1);
		$("#str"+itm).text(this.items[itm].display+" ("+this.items[itm].level+") - "+this.items[itm].price);
		items.updatePellets();
	},
	
	getPrice: function(itemPrice){
		var redPel=0, yelPel=0, bluPel=0, blaPel=0, pinPel=0, coin=0;
		var arrPrices=itemPrice.split("~");
		
		for(var item in arrPrices){
			var price=arrPrices[item];
			var clr=price.slice(-1);
			var num=parseInt(price.substr(0,price.length-1));
			
			if(clr=="r")
				redPel=num;
			else if(clr=="y")
				yelPel=num;
			else if(clr=="b")
				bluPel=num;
			else if(clr=="k")
				blaPel=num;
			else if(clr=="p")
				pinPel=num;
			else if(clr=="c")
				coin=num;
		}
		
		return [redPel, yelPel, bluPel, blaPel, pinPel, coin];
	},
	
	updateDisplay : function(clr){
		$("#numWorkers"+clr).text(this.pikmn[clr].display+" Workers: "+this.pikmn[clr].num);
	}
};