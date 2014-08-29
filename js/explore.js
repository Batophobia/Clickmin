var explore = {
	init: function(){
		if(pikmin.party.total>0)
			$("#btnMap").show();
		
		$('#btnMap').on('click',function(){
			$('#map').show();
			$('#overworld').show();
			$('#btnMap').hide();
			$('.pikminFarm').hide();
			explore.isOnMap=true;
		});
		$('#btnStop').on('click',function(){
			$('#overworld').show();
			$('#map'+explore.questArea).hide();
			$('#btnStop').hide();
			$('.squadMaker').hide();
			$('#btnBomb').hide();
			explore.resetMap();
			explore.isOnMap=true;
			
			if(pikmin.squad.total>0)
				$('#btnClearSquad').show();
		});
		$('#btnBomb').on('click',function(){
			items.throwBomb();
		});
		$('#btnQuest').on('click',function(){
			$('#btnClearSquad').hide();
			explore.beginQuest();
		});
		$('#btnClearSquad').on('click',function(){
			pikmin.squad.reset();
			explore.updateSquad();
			$('#btnClearSquad').hide();
		});
		
		$(".mapButton").hover(function(){
			if(explore.places[this.id].canGo){
				$(".mapButton").css({'cursor': 'pointer'});
				$('#placeName').text(explore.places[this.id].display);
			}
		});
		$(".mapButton").mouseout(function(){
			$('#placeName').text("");
			$(".mapButton").css({'cursor': 'default'});
		});
		
		$('.area0').on('click',function(){
			$('#map').hide();
			$('.squadMaker').hide();
			$('#btnStop').hide();
			$('#btnMap').show();
			$('.pikminFarm').show();
			explore.isOnMap=false;
		});
		
		if(this.places["15"].canGo){
			$('.area15').on('click',function(){
				items.giveBomb();
				items.giveNectar();
				explore.places["15"].canGo=false;
				explore.places["15"].timesBeat++;
				$('.area15').off('click');
			});
		}
		
		for(var i=1;i<15;i++){
			if(explore.places[i].canGo){
				explore.unlock(i);
			}
		}
		
		$(document).mousemove( function(e) {
			$('#placeName').css({
				'top': e.pageY+15,
				'left':e.pageX
			});
		});
		
		$("#item11").addClass("canShow");
	},
	isOnMap: false,
	isQuesting: false,
	questArea: 0,
	plyrLoc: 0,
	delayMax: 5,
	curDelay: 5,
	
	addToSquad: function(clr, type){
		if(type=="bud")
			type="numBud";
		else if(type=="flower")
			type="numFlower";
		else
			type="numLeaf";
		
		if(pikmin.party[clr][type]>1 && pikmin.squad.total<100){
			$('#btnClearSquad').show();
			pikmin.party[clr][type]-=1;
			pikmin.party.total-=1;
			pikmin.squad[clr][type]+=1;
			pikmin.squad.total+=1;
			
			$("#"+clr+type.substring(3)+"SquadNum").text(pikmin.squad[clr][type]);
			$("#totalSquadNum").text("Total: "+pikmin.squad.total);
		}
	},
	removeFromSquad: function(clr, type){
		if(type=="bud")
			type="numBud";
		else if(type=="flower")
			type="numFlower";
		else
			type="numLeaf";
		
		if(pikmin.squad[clr][type]>0){
			pikmin.party[clr][type]+=1;
			pikmin.party.total+=1;
			pikmin.squad[clr][type]-=1;
			pikmin.squad.total-=1;
			
			$("#"+clr+type.substring(3)+"SquadNum").text(pikmin.squad[clr][type]);
			$("#totalSquadNum").text("Total: "+pikmin.squad.total);
		}
		
		if(pikmin.squad.total<=0)
			$('#btnClearSquad').hide();
	},
	
	unlock: function(input){
		$('.area'+input).on('click',function(){
			$('#btnStop').show();
			$('.squadMaker').show();
			explore.questArea=input;
		});
		explore.places[input].canGo=true;
		
		switch(input){
			case 1:
				$("#item8").addClass("canShow");
				$("#item9").addClass("canShow");
				$("#item13").addClass("canShow");
				break;
			case 2:
				$("#item8").addClass("canShow");
				$("#item10").addClass("canShow");
				$("#item14").addClass("canShow");
				break;
			case 3:
				$("#item17").addClass("canShow");
				$("#item18").addClass("canShow");
				$("#item22").addClass("canShow");
				break;
			case 4:
				$("#item19").addClass("canShow");
				$("#item20").addClass("canShow");
				$("#item21").addClass("canShow");
				$("#item23").addClass("canShow");
				break;
		}
	},
	
	beginQuest: function(){
		if(pikmin.squad.total>0){
			$('.squadMaker').hide();
			$('#overworld').hide();
			$('#map'+explore.questArea).show();
			explore.isQuesting=true;
			explore.plyrLoc=0;
			explore.populate(explore.questArea);
			
			if(explore.questArea==2)
				pikmin.squad.killAllBut("red");
			else if(explore.questArea==4)
				pikmin.squad.killAllBut("yellow");
			else if(explore.questArea==6)
				pikmin.squad.killAllBut("blue");
			
			if(items.types.bombRock.total>0 && pikmin.squad.squadColorNum("yellow")>0)
				$("#btnBomb").show();
		}
	},
	
	populate: function(area){
		var tmpEnmy;
		switch(area){
			case 1:
				tmpEnmy = explore.batman(8,16);
				$("#1_"+tmpEnmy).html(enemy.basicWall.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.basicWall);
				
				tmpEnmy = explore.batman(17,23);
				$("#1_"+tmpEnmy).html(enemy.bulborb.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.bulborb);
				
				tmpEnmy = explore.batman(24,32);
				$("#1_"+tmpEnmy).html(enemy.bulborb.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.bulborb);
				break;
			case 2:
				tmpEnmy = explore.batman(8,16);
				$("#2_"+tmpEnmy).html(enemy.bulborb.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.bulborb);
				
				tmpEnmy = explore.batman(17,23);
				$("#2_"+tmpEnmy).html(enemy.blowhog.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.blowhog);
				
				tmpEnmy = explore.batman(24,32);
				$("#2_"+tmpEnmy).html(enemy.bulborb.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.bulborb);
				break;
			case 3:
				tmpEnmy = explore.batman(5,12);
				$("#3_"+tmpEnmy).html(enemy.joustmite.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.joustmite);
				
				tmpEnmy = explore.batman(13,20);
				$("#3_"+tmpEnmy).html(enemy.joustmite.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.joustmite);
				
				tmpEnmy = explore.batman(21,28);
				$("#3_"+tmpEnmy).html(enemy.joustmite.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.joustmite);
				
				tmpEnmy = explore.batman(29,32);
				$("#3_"+tmpEnmy).html(enemy.slooch.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.slooch);
				break;
			case 4:
				tmpEnmy = explore.batman(5,12);
				$("#4_"+tmpEnmy).html(enemy.amprat.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.amprat);
				
				tmpEnmy = explore.batman(13,20);
				$("#4_"+tmpEnmy).html(enemy.rockWall.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.rockWall);
				
				tmpEnmy = explore.batman(21,28);
				$("#4_"+tmpEnmy).html(enemy.anodeBeetle.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.anodeBeetle);
				
				tmpEnmy = explore.batman(29,32);
				$("#4_"+tmpEnmy).html(enemy.amprat.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.amprat);
				break;
			case 5:
				break;
			case 6:
				break;
			case 7:
				break;
			case 11:
				break;
			case 12:
				break;
			case 13:
				break;
			case 14:
				break;
		}
	},
	
	tick: function(){
		if(explore.curDelay>0)
			explore.curDelay--;
		
		if(explore.isQuesting && explore.curDelay<=0){
			explore.curDelay=explore.delayMax;
			if(explore.canMove()){
				$("#"+explore.questArea+"_"+explore.plyrLoc).text("___");
				explore.plyrLoc++;
				$("#"+explore.questArea+"_"+explore.plyrLoc).text(":o:");
			}else if(explore.isQuesting){
				$("#opntName").text(enemy.monsterList["0"].name);
				$(".battleDialog").show();
				var squadStrength=pikmin.squad.strength();
				squadStrength=explore.batman(squadStrength/2,squadStrength);
				
				if(enemy.monsterList["0"].special=="")
					enemy.monsterList["0"].hp-=squadStrength;
				
				pikmin.squad.kill(explore.batman(0,enemy.monsterList["0"].attack),enemy.monsterList["0"].status);
				
				$("#opntHP").text(enemy.monsterList["0"].hp);
				$("#plyrHP").text(pikmin.squad.total);
				
				if(pikmin.squad.total<=0){
					this.resetMap();
					return;
				}
				
				if(enemy.monsterList["0"].hp<=0){
					for(var i=0;i<Object.size(enemy.monsterList)-1;i++){
						enemy.monsterList[i]=enemy.monsterList[i+1];
					}
					delete enemy.monsterList[Object.size(enemy.monsterList)-1];
					$("#"+explore.questArea+"_"+(explore.plyrLoc+1)).text("___");
					$(".battleDialog").hide();
				}
			}
			
			if(explore.questArea==2){
				var newMap=$("#map2").html();
				newMap=newMap.replace(/\(|\)/g, function(m) {
					return m === ')' ? '(' : ')';
				});
				$("#map2").html(newMap);
			}
		}
	},
	
	resetMap: function(){
		$('#btnStop').hide();
		enemy.monsterList={};
		$(".battleDialog").hide();
		
		var tmpPlace=0;
		while($("#"+explore.questArea+"_"+tmpPlace).length>0){
			$("#"+explore.questArea+"_"+tmpPlace).text("___");
			tmpPlace++;
		}
		
		$('#overworld').show();
		$('#map'+explore.questArea).hide();
		explore.questArea=0;
		explore.plyrLoc=0;
		explore.isQuesting=false;
		explore.updateSquad();
	},
	
	updateSquad: function(){
		$("#redLeafSquadNum").text(pikmin.squad.red.numLeaf);
		$("#redBudSquadNum").text(pikmin.squad.red.numBud);
		$("#redFlowerSquadNum").text(pikmin.squad.red.numFlower);
		$("#yellowLeafSquadNum").text(pikmin.squad.yellow.numLeaf);
		$("#yellowBudSquadNum").text(pikmin.squad.yellow.numBud);
		$("#yellowFlowerSquadNum").text(pikmin.squad.yellow.numFlower);
		$("#blueLeafSquadNum").text(pikmin.squad.blue.numLeaf);
		$("#blueBudSquadNum").text(pikmin.squad.blue.numBud);
		$("#blueFlowerSquadNum").text(pikmin.squad.blue.numFlower);
		$("#purpleLeafSquadNum").text(pikmin.squad.purple.numLeaf);
		$("#purpleBudSquadNum").text(pikmin.squad.purple.numBud);
		$("#purpleFlowerSquadNum").text(pikmin.squad.purple.numFlower);
		$("#whiteLeafSquadNum").text(pikmin.squad.white.numLeaf);
		$("#whiteBudSquadNum").text(pikmin.squad.white.numBud);
		$("#whiteFlowerSquadNum").text(pikmin.squad.white.numFlower);
		$("#rockLeafSquadNum").text(pikmin.squad.rock.numLeaf);
		$("#rockBudSquadNum").text(pikmin.squad.rock.numBud);
		$("#rockFlowerSquadNum").text(pikmin.squad.rock.numFlower);
		$("#pinkLeafSquadNum").text(pikmin.squad.pink.numLeaf);
		$("#pinkBudSquadNum").text(pikmin.squad.pink.numBud);
		$("#pinkFlowerSquadNum").text(pikmin.squad.pink.numFlower);
		$("#totalSquadNum").text("Total: "+pikmin.squad.total);
	},
	
	finish: function(){
		var randNumber = this.batman(0,100);
		$('#btnStop').hide();
		$('#btnBomb').hide();
		$('#btnClearSquad').show();
		switch(explore.questArea){
			case 1:
				if(explore.places["1"].timesBeat==0){
					explore.unlock(2);
					team.find("koppad");
				}else if(randNumber>95){
					items.addRandomThing();
				}else{
					items.giveNectar();
				}
				break;
			case 2:
				if(explore.places["2"].timesBeat==0){
					items.give("Yellow Onion", 0, "onion");
					explore.unlock(3);
				}else if(randNumber>90){
					items.addRandomThing();
				}else if(randNumber>80){
					items.giveBomb();
				}else{
					items.giveNectar();
				}
				break;
			case 3:
				if(explore.places["3"].timesBeat==0){
					explore.unlock(4);
				}else if(randNumber>95){
					items.addRandomThing();
				}else if(randNumber>35){
					items.giveBomb();
				}else{
					items.giveNectar();
				}
				break;
			case 4:
				if(explore.places["4"].timesBeat==0){
					items.give("Blue Onion", 0, "onion");
					explore.unlock(5);
				}else if(randNumber>90){
					items.addRandomThing();
				}else if(randNumber>65){
					items.giveBomb();
				}else{
					items.giveNectar();
				}
				break;
			case 5:
				if(explore.places["5"].timesBeat==0){
					explore.unlock(6);
				}else if(randNumber>90){
					items.addRandomThing();
				}else if(randNumber>70){
					items.giveBomb();
				}else if(randNumber>50){
					items.giveNectar();
				}else{
					items.givePellet();
				}
				break;
			case 6:
				if(explore.places["6"].timesBeat==0){
					items.give("Black Onion", 0, "onion");
					explore.unlock(7);
				}else if(randNumber>90){
					items.addRandomThing();
				}else if(randNumber>70){
					items.giveBomb();
				}else if(randNumber>50){
					items.giveNectar();
				}else{
					items.givePellet();
				}
				break;
			case 7:
				if(explore.places["7"].timesBeat==0){
					explore.unlock(11);
				}else if(randNumber>90){
					items.addRandomThing();
				}else if(randNumber>70){
					items.giveBomb();
				}else if(randNumber>50){
					items.giveNectar();
				}else{
					items.givePellet();
				}
				break;
			case 11:
				if(explore.places["11"].timesBeat==0){
					items.give("Pink Onion", 0, "onion");
					explore.unlock(12);
				}else if(randNumber>90){
					items.addRandomThing();
				}else if(randNumber>70){
					items.giveBomb();
				}else if(randNumber>50){
					items.giveNectar();
				}else{
					items.givePellet();
				}
				break;
			case 12:
				if(explore.places["12"].timesBeat==0){
					explore.unlock(13);
				}else if(randNumber>90){
					items.addRandomThing();
				}else if(randNumber>70){
					items.giveBomb();
				}else if(randNumber>50){
					items.giveNectar();
				}else{
					items.givePellet();
				}
				break;
			case 13:
				if(explore.places["13"].timesBeat==0){
					explore.unlock(14);
				}else if(randNumber>90){
					items.addRandomThing();
				}else if(randNumber>70){
					items.giveBomb();
				}else if(randNumber>50){
					items.giveNectar();
				}else{
					items.givePellet();
				}
				break;
			case 14:
				if(explore.places["14"].timesBeat==0){
					
				}else if(randNumber>90){
					items.addRandomThing();
				}else if(randNumber>70){
					items.giveBomb();
				}else if(randNumber>50){
					items.giveNectar();
				}else{
					items.givePellet();
				}
				break;
		}
		
		$("#"+explore.questArea+"_"+explore.plyrLoc).text("___");
		$('#overworld').show();
		$('#map'+explore.questArea).hide();
		explore.places[explore.questArea].timesBeat++;
		explore.questArea=0;
		explore.plyrLoc=0;
		explore.isQuesting=false;
		explore.updateSquad();
	},
	
	canMove: function(){
		var nextSpot=$("#"+explore.questArea+"_"+(explore.plyrLoc+1)).text();
		if(nextSpot=="___")
			return true;
		else if(nextSpot=="__" || nextSpot=="")
			explore.finish();
		else
			return false;
	},
	
	batman: function(min, max){
		return Math.floor(Math.floor(Math.random() * (max-min)) + min);
	},
	
	places: {
		 0: {display: "Ship"		, canGo: true , timesBeat: 0},
		 1: {display: "Plains"		, canGo: false, timesBeat: 0},
		 2: {display: "Fire Forest"	, canGo: false, timesBeat: 0},
		 3: {display: "Desert"		, canGo: false, timesBeat: 0},
		 4: {display: "Power Plant"	, canGo: false, timesBeat: 0},
		 5: {display: "Clearing"	, canGo: false, timesBeat: 0},
		 6: {display: "Waterfall"	, canGo: false, timesBeat: 0},
		 7: {display: "Ancient Tree", canGo: false, timesBeat: 0},
		 8: {display: "South Bridge", canGo: false, timesBeat: 0},
		 9: {display: "North Bridge", canGo: false, timesBeat: 0},
		10: {display: "Farm"		, canGo: false, timesBeat: 0},
		11: {display: "Pit"			, canGo: false, timesBeat: 0},
		12: {display: "Snowman"		, canGo: false, timesBeat: 0},
		13: {display: "Swamp"		, canGo: false, timesBeat: 0},
		14: {display: "Mines"		, canGo: false, timesBeat: 0},
		15: {display: ""			, canGo: true , timesBeat: 0}
	}
};