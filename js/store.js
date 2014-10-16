var store = {
	items:{
		redFarm:		{
			display: "Farm Upgrade - Red Worker",
			inStock:false,
			price: "5r",
			level: 0,
			init: function(){
				farm.pikmn.red.delay-=this.level;
			},
			levelUp: function(){
				this.level++;
			}
		},
		yellowFarm:	{
			display: "Farm Upgrade - Yellow Worker",
			inStock:false,
			price: "5y",
			level: 0,
			init: function(){
				farm.pikmn.yellow.delay-=this.level;
			},
			levelUp: function(){
				this.level++;
			}
		},
		blueFarm:	{
			display: "Farm Upgrade - Blue Worker",
			inStock:false,
			price: "5b",
			level: 0,
			init: function(){
				farm.pikmn.blue.delay-=this.level;
			},
			levelUp: function(){
				this.level++;
			}
		},
		rockFarm:	{
			display: "Farm Upgrade - Black Worker",
			inStock:false,
			price: "5k",
			level: 0,
			init: function(){
				farm.pikmn.rock.delay-=this.level;
			},
			levelUp: function(){
				this.level++;
			}
		},
		pinkFarm:	{
			display: "Farm Upgrade - Pink Worker",
			inStock:false,
			price: "5p",
			level: 0,
			init: function(){
				farm.pikmn.pink.delay-=this.level;
			},
			levelUp: function(){
				this.level++;
			}
		},
		alphItm:	{
			display: "Team Upgrade - Alph",
			inStock:false,
			price: "5c",
			level: 0,
			init: function(){
				team.party.alph.counterMod-=this.level;
			},
			levelUp: function(){
				this.level++;
				team.party.alph.counterMod--;
			}
		},
		brittanyItm:	{
			display: "Team Upgrade - Brittany",
			inStock:false,
			price: "2c",
			level: 0,
			init: function(){
				team.party.brittany.counterMod-=this.level;
			},
			levelUp: function(){
				this.level++;
				team.party.brittany.counterMod--;
			}
		},
		louieItm:	{
			display: "Team Upgrade - Louie",
			inStock:false,
			price: "10c",
			level: 0,
			init: function(){
				for(var i=0;i<this.level;i++)
					team.party.louie.stronger();
			},
			levelUp: function(){
				this.level++;
				team.party.louie.stronger();
			}
		},
		presItm:	{
			display: "Team Upgrade - President",
			inStock:false,
			price: "100c",
			level: 0,
			init: function(){
			},
			levelUp: function(){
				this.level++;
			}
		},
		redPkmn:	{
			display: "Pikmin Upgrade - Red",
			inStock:false,
			price: "60r~15c",
			level: 0,
			init: function(){
				pikmin.squad.red.strength+=this.level;
			},
			levelUp: function(){
				this.level++;
				pikmin.squad.red.strength++;
			}
		},
		yellowPkmn:	{
			display: "Pikmin Upgrade - Yellow",
			inStock:false,
			price: "40y~10c",
			level: 0,
			init: function(){
				pikmin.squad.yellow.strength+=this.level;
			},
			levelUp: function(){
				this.level++;
				pikmin.squad.yellow.strength++;
			}
		},
		bluePkmn:	{
			display: "Pikmin Upgrade - Blue",
			inStock:false,
			price: "40b~10c",
			level: 0,
			init: function(){
				pikmin.squad.blue.strength+=this.level;
			},
			levelUp: function(){
				this.level++;
				pikmin.squad.blue.strength++;
			}
		},
		rockPkmn:	{
			display: "Pikmin Upgrade - Rock",
			inStock:false,
			price: "60k~15c",
			level: 0,
			init: function(){
				pikmin.squad.rock.strength+=this.level;
			},
			levelUp: function(){
				this.level++;
				pikmin.squad.rock.strength++;
			}
		},
		pinkPkmn:	{
			display: "Pikmin Upgrade - Winged",
			inStock:false,
			price: "28p~7c",
			level: 0,
			init: function(){
				pikmin.squad.pink.strength+=this.level;
			},
			levelUp: function(){
				this.level++;
				pikmin.squad.pink.strength++;
			}
		},
		whitePkmn:	{
			display: "Pikmin Upgrade - White",
			inStock:false,
			price: "16r~8y~4b~2k~1p",
			level: 0,
			init: function(){
				pikmin.squad.white.strength+=this.level;
			},
			levelUp: function(){
				this.level++;
				pikmin.squad.white.strength++;
			}
		},
		purplePkmn:	{
			display: "Pikmin Upgrade - Purple",
			inStock:false,
			price: "500r~500b~10c",
			level: 0,
			init: function(){
				pikmin.squad.purple.strength+=this.level;
			},
			levelUp: function(){
				this.level++;
				pikmin.squad.purple.strength++;
			}
		},
		sqdSize:	{
			display: "Pikmin Upgrade - Party Size",
			inStock:false,
			price: "1000r~1000y~1000b~1000k~1000p~50c",
			level: 0,
			init: function(){
				pikmin.squad.max+=this.level*10;
			},
			levelUp: function(){
				this.level++;
				pikmin.squad.max+=10;
			}
		},
		itmNectar:	{
			display: "Item Upgrade - Nectar",
			inStock:false,
			price: "50y~25p~5c",
			level: 0,
			init: function(){
				//Nothing needed
			},
			levelUp: function(){
				this.level++;
			}
		},
		itmBomb:	{
			display: "Item Upgrade - Bomb Factory",
			inStock:false,
			price: "100y~500k~50c",
			level: 0,
			init: function(){
				//Nothing needed
			},
			levelUp: function(){
				this.level++;
			}
		}
	},
	
	init : function(){
		var curTitle="";
		for(var group in this.items){
			if(curTitle!=this.items[group].display.split("-")[0]){
				curTitle=this.items[group].display.split("-")[0];
				$(".storeStock").append("<div class='strCatContainer' id='storeHeader"+curTitle.replace(/\s+/g, '')+"'><span class='storeHeader'>"+curTitle+"</span></div>");
			}
			
			this.items[group].init();
			$("#storeHeader"+curTitle.replace(/\s+/g, '')).append("<div class='strItm strItem"+curTitle.replace(/\s+/g, '')+"'><span id='str"+group+"'></span> <button class='strBuy' id='buy"+group+"'>Buy</button></div>");
			
			var temp=this.items[group].level;
			
			if(temp==0){
				this.refreshPrice(group);
			}else{
				this.items[group].level=0;
				
				for(var i=0;i<temp;i++){
					this.items[group].level++;
					this.refreshPrice(group);
				}
			}
		}
		$(".storeHeader").on('click',function(){
			var itmGroup=this.parentNode.id;
			itmGroup=itmGroup.replace("storeHeader","strItem");
			$(".strItm").hide();
			$("."+itmGroup).show();
		});
		$(".strBuy").on('click',function(){
			var itm=this.id.substring(3);
			store.buy(itm);
		});
		$(".btnSellStuff").on('click',function(){
			store.sellAll();
		});
	},
	
	tick: function(){
		if(this.items.itmBomb.level>0 && items.types.bombRock.total<this.items.itmBomb.level*2){
			var tmpDelay=10000/Math.pow(this.items.itmBomb.level,1.5);
			if(main.counter%tmpDelay==0)
				items.giveBomb();
		}
	},
	
	sellAll: function(){
		var cntNotUseless=0;
		if(Object.size(items.types.stuff)>0){
			for(var thing in items.types.stuff){
				if(items.types.stuff[thing].useless){
					items.addCoins(Math.ceil(items.types.stuff[thing].numNeeded/2*(Math.sqrt(this.items.presItm.level)+1)));
					delete items.types.stuff[thing];
				}
				else{
					$("#"+(thing)).attr("id",cntNotUseless);
					items.types.stuff[cntNotUseless]=items.types.stuff[thing];
					delete items.types.stuff[thing];
					cntNotUseless++;
				}
			}
			$(".uselessItem").remove();
		}
		$(".coin").text("Pokos: "+items.types.coins.total)
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
		
		this.items[itm].levelUp();
		//this.items[itm].inStock=false;
		this.refreshPrice(itm);
		
		this.updateWallets();
	},
	
	refreshPrice: function(itm){
		var arrPrice = this.getPrice(this.items[itm].price);
		var lvl=this.items[itm].level;
		var strOutput="";
		
		if(arrPrice[0]>0){
			strOutput+="~"+Math.ceil(Math.pow(1.2,lvl)*arrPrice[0])+"r";
		}if(arrPrice[1]>0){
			strOutput+="~"+Math.ceil(Math.pow(1.2,lvl)*arrPrice[1])+"y";
		}if(arrPrice[2]>0){
			strOutput+="~"+Math.ceil(Math.pow(1.2,lvl)*arrPrice[2])+"b";
		}if(arrPrice[3]>0){
			strOutput+="~"+Math.ceil(Math.pow(1.2,lvl)*arrPrice[3])+"k";
		}if(arrPrice[4]>0){
			strOutput+="~"+Math.ceil(Math.pow(1.2,lvl)*arrPrice[4])+"p";
		}if(arrPrice[5]>0){
			strOutput+="~"+Math.ceil(Math.pow(1.2,lvl)*arrPrice[5])+"c";
		}
		this.items[itm].price = strOutput.slice(1);
		$("#str"+itm).text(this.items[itm].display+" ("+this.items[itm].level+") - "+this.items[itm].price.replace("~",", "));
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
	
	updateWallets: function(){
		$(".coin").text("Pokos: "+items.types.coins.total)
		items.updatePellets();
	}
};