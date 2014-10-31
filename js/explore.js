var explore = {
	init: function(){
		if(pikmin.party.total>25)
			$("#btnMap").show();
		
		$('#btnLeaveFarm').on('click',function(){
			$(".pelletFarm").hide();
			$("#map").show();
			$(".topBar").show();
		});
		$('#btnMap').on('click',function(){
			$('#map').show();
			$('#overworld').show();
			$('#btnMap').hide();
			$('.pikminFarm').hide();
			if(team.party.olimar.inParty)
				$('#btnSpelunking').show();
				
			explore.isOnMap=true;
		});
		$('#btnStop').on('click',function(){
			$('#overworld').show();
			$('#map'+explore.questArea).hide();
			$('#btnStop').hide();
			$('.squadMaker').hide();
			$('#btnBomb').hide();
			if(team.party.olimar.inParty)
				$('#btnSpelunking').show();
			
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
			$('#btnSpelunking').hide();
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
		
		$('#btnSpelunking').on('click',function(){
			$('#btnStop').show();
			$('.squadMaker').show();
			$('#btnSpelunking').hide();
			explore.questArea=16;
		});
		
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
	delayMax: 3,
	curDelay: 1,
	cntEndless: 0,
	blnEndless: false,
	
	addToSquad: function(clr, type){
		var numToAdd=1;
		
		if(main.keyDown==16){
			numToAdd=10;
		}else if(main.keyDown==90){
			numToAdd=25;
		}else if(main.keyDown==17){
			numToAdd=100;
		}
		
		if(type=="bud")
			type="numBud";
		else if(type=="flower")
			type="numFlower";
		else
			type="numLeaf";
		
		if(pikmin.party[clr][type]>0 && pikmin.squad.total<pikmin.squad.max){
			if(numToAdd>pikmin.party[clr][type])
				numToAdd=pikmin.party[clr][type];
			if(numToAdd+pikmin.squad.total>pikmin.squad.max)
				numToAdd=pikmin.squad.max-pikmin.squad.total;
			
			$('#btnClearSquad').show();
			pikmin.party[clr][type]-=numToAdd;
			pikmin.party.total-=numToAdd;
			pikmin.squad[clr][type]+=numToAdd;
			pikmin.squad.total+=numToAdd;
			
			$("#"+clr+type.substring(3)+"SquadNum").text(pikmin.squad[clr][type]);
			$("#totalSquadNum").text("Total: "+pikmin.squad.total);
		}
	},
	removeFromSquad: function(clr, type){
		var numToAdd=1;
		
		if(type=="bud")
			type="numBud";
		else if(type=="flower")
			type="numFlower";
		else
			type="numLeaf";
		
		if(main.keyDown==16){
			numToAdd=10;
		}else if(main.keyDown==90){
			numToAdd=25;
		}else if(main.keyDown==17){
			numToAdd=100;
		}
		
		if(pikmin.squad[clr][type]>0){
			if(numToAdd>pikmin.squad[clr][type])
				numToAdd=pikmin.squad[clr][type];
			
			pikmin.party[clr][type]+=numToAdd;
			pikmin.party.total+=numToAdd;
			pikmin.squad[clr][type]-=numToAdd;
			pikmin.squad.total-=numToAdd;
			
			$("#"+clr+type.substring(3)+"SquadNum").text(pikmin.squad[clr][type]);
			$("#totalSquadNum").text("Total: "+pikmin.squad.total);
		}
		
		if(pikmin.squad.total<=0)
			$('#btnClearSquad').hide();
	},
	
	unlock: function(input){
		if(input==10){
			$('.area'+input).on('click',function(){
				explore.questArea=input;
				$("#map").hide();
				$(".topBar").hide();
				$(".pelletFarm").show();
			});
		}else{
			$('.area'+input).on('click',function(){
				$('#btnStop').show();
				$('.squadMaker').show();
				$('#btnSpelunking').hide();
				explore.questArea=input;
			});
		}
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
			case 5:
				$("#item30").addClass("canShow");
				$("#item39").addClass("canShow");
				$("#item40").addClass("canShow");
				$("#item41").addClass("canShow");
				break;
			case 6:
				$("#item31").addClass("canShow");
				$("#item42").addClass("canShow");
				$("#item43").addClass("canShow");
				$("#item44").addClass("canShow");
				break;
			case 7:
				$("#item32").addClass("canShow");
				$("#item46").addClass("canShow");
				$("#item47").addClass("canShow");
				$("#item48").addClass("canShow");
				break;
			case 8:
			case 9:
				$("#item33").addClass("canShow");
				$("#item49").addClass("canShow");
				break;
			case 10:
				$("#item34").addClass("canShow");
				break;
			case 11:
				$("#item35").addClass("canShow");
				$("#item50").addClass("canShow");
				$("#item51").addClass("canShow");
				$("#item52").addClass("canShow");
				break;
			case 12:
				$("#item36").addClass("canShow");
				$("#item53").addClass("canShow");
				$("#item54").addClass("canShow");
				$("#item55").addClass("canShow");
				break;
			case 13:
				$("#item37").addClass("canShow");
				$("#item58").addClass("canShow");
				$("#item59").addClass("canShow");
				$("#item60").addClass("canShow");
				break;
			case 14:
				$("#item38").addClass("canShow");
				break;
		}
	},
	
	beginQuest: function(){
		if(pikmin.squad.total>0){
			this.cntEndless=0;
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
			
			$("#plyrHP").text(pikmin.squad.total);
			$(".battleDialog").show();
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
				tmpEnmy = explore.batman(3,5);
				$("#5_"+tmpEnmy).html(enemy.sheargrub.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.sheargrub);
				tmpEnmy++;
				$("#5_"+tmpEnmy).html(enemy.sheargrub.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.sheargrub);
				
				tmpEnmy = explore.batman(10,12);
				$("#5_"+tmpEnmy).html(enemy.sheargrub.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.sheargrub);
				tmpEnmy++;
				$("#5_"+tmpEnmy).html(enemy.sheargrub.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.sheargrub);
				
				tmpEnmy = explore.batman(16,20);
				$("#5_"+tmpEnmy).html(enemy.snagret.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.snagret);
				tmpEnmy = explore.batman(25,28);
				$("#5_"+tmpEnmy).html(enemy.snagret.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.snagret);
				
				tmpEnmy = explore.batman(29,32);
				$("#5_"+tmpEnmy).html(enemy.cannonBeetle.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.cannonBeetle);
				break;
			case 6:
				tmpEnmy = explore.batman(3,8);
				$("#6_"+tmpEnmy).html(enemy.wollywog.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.wollywog);
				
				tmpEnmy = explore.batman(9,13);
				$("#6_"+tmpEnmy).html(enemy.bulbear.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.bulbear);
				
				tmpEnmy = explore.batman(14,20);
				$("#6_"+tmpEnmy).html(enemy.wollywog.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.wollywog);
				
				tmpEnmy = explore.batman(22,26);
				$("#6_"+tmpEnmy).html(enemy.snagret.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.snagret);
				
				tmpEnmy = explore.batman(29,32);
				$("#6_"+tmpEnmy).html(enemy.goolix.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.goolix);
				break;
			case 7:
				tmpEnmy = explore.batman(3,8);
				$("#7_"+tmpEnmy).html(enemy.blowhog.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.blowhog);
				
				tmpEnmy = explore.batman(9,13);
				$("#7_"+tmpEnmy).html(enemy.bulbear.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.bulbear);
				
				tmpEnmy = explore.batman(14,20);
				$("#7_"+tmpEnmy).html(enemy.skutterchuck.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.skutterchuck);
				
				tmpEnmy = explore.batman(22,26);
				$("#7_"+tmpEnmy).html(enemy.electricWall.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.electricWall);
				
				tmpEnmy = explore.batman(29,32);
				$("#7_"+tmpEnmy).html(enemy.arachnode.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.arachnode);
				break;
			case 8:
			case 9:
				break;
			case 11:
				tmpEnmy = explore.batman(3,6);
				$("#11_"+tmpEnmy).html(enemy.skutterchuck.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.skutterchuck);
				
				tmpEnmy = explore.batman(8,12);
				$("#11_"+tmpEnmy).html(enemy.snagret.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.snagret);
				
				tmpEnmy = explore.batman(14,18);
				$("#11_"+tmpEnmy).html(enemy.skutterchuck.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.skutterchuck);
				
				tmpEnmy = explore.batman(20,24);
				$("#11_"+tmpEnmy).html(enemy.cannonLarva.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.cannonLarva);
				
				tmpEnmy = explore.batman(26,28);
				$("#11_"+tmpEnmy).html(enemy.crawbster.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.crawbster);
				
				tmpEnmy = explore.batman(30,32);
				$("#11_"+tmpEnmy).html(enemy.mawdad.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.mawdad);
				break;
			case 12:
				tmpEnmy = explore.batman(3,5);
				$("#12_"+tmpEnmy).html(enemy.snitchbug.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.snitchbug);
				
				tmpEnmy = explore.batman(7,10);
				$("#12_"+tmpEnmy).html(enemy.snagret.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.snagret);
				
				tmpEnmy = explore.batman(12,15);
				$("#12_"+tmpEnmy).html(enemy.snitchbug.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.snitchbug);
				
				tmpEnmy = explore.batman(17,25);
				$("#12_"+tmpEnmy).html(enemy.groink.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.groink);
				
				tmpEnmy = 27;
				$("#12_"+tmpEnmy).html(enemy.bulborb.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.bulborb);
				tmpEnmy = 28;
				$("#12_"+tmpEnmy).html(enemy.bulborb.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.bulborb);
				tmpEnmy = 29;
				$("#12_"+tmpEnmy).html(enemy.bulborb.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.bulborb);
				tmpEnmy = 30;
				$("#12_"+tmpEnmy).html(enemy.bulbear.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.bulbear);
				tmpEnmy = 31;
				$("#12_"+tmpEnmy).html(enemy.bulbear.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.bulbear);
				tmpEnmy = 32;
				$("#12_"+tmpEnmy).html(enemy.bulblax.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.bulblax);
				break;
			case 13:
				tmpEnmy = explore.batman(3,8);
				$("#13_"+tmpEnmy).html(enemy.poisonWall.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.poisonWall);
				
				tmpEnmy = explore.batman(10,16);
				$("#13_"+tmpEnmy).html(enemy.sputtlefish.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.sputtlefish);
				
				tmpEnmy = explore.batman(18,23);
				$("#13_"+tmpEnmy).html(enemy.sputtlefish.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.sputtlefish);
				
				tmpEnmy = explore.batman(25,31);
				$("#13_"+tmpEnmy).html(enemy.phosbat.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.phosbat);
				break;
			case 14:
				var arrEnemies = ["joustmite","slooch","blowhog","amprat","sheargrub","snagret","cannonBeetle","wollywog","goolix","bulbear","skutterchuck","arachnode","cannonLarva","snitchbug","basicWall","crawbster","mawdad","groink","bulblax","sputtlefish","phosbat","bulborb","dirtWall"];
				var numEnemies = explore.batman(5,12);
				
				for(var i=0;i<numEnemies;i++){
					tmpEnmy = Math.ceil(2+(i/numEnemies)*30);
					selEnemy = arrEnemies[explore.batman(0,arrEnemies.length)];
					$("#14_"+tmpEnmy).html(enemy[selEnemy].display);
					var curEnemy=Object.size(enemy.monsterList);
					enemy.monsterList[curEnemy]=jQuery.extend({},enemy[selEnemy]);
					enemy.monsterList[curEnemy].hp*=1+(this.cntEndless/10);
					if(enemy.monsterList[curEnemy].attack>0)
						enemy.monsterList[curEnemy].attack+=Math.ceil(this.cntEndless/2);
				}
				break;
			case 16:
				//Caves
				var arrEnemies = ["joustmite","slooch","blowhog","amprat","snagret","wollywog","bulbear","skutterchuck","arachnode","snitchbug","basicWall","bulborb","dirtWall"];
				var numEnemies = explore.batman(5,12);
				
				for(var i=0;i<numEnemies;i++){
					tmpEnmy = Math.ceil(2+(i/numEnemies)*30);
					selEnemy = arrEnemies[explore.batman(0,arrEnemies.length)];
					$("#16_"+tmpEnmy).html(enemy[selEnemy].display);
					enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy[selEnemy]);
				}
				break;
		}
	},
	bridgeBuilder: 0,
	
	tick: function(){
		if(explore.curDelay>0)
			explore.curDelay--;
		
		if(explore.isQuesting){
			if(explore.curDelay<=0){
				explore.curDelay=explore.delayMax;
				if(explore.canMove()){
					$("#"+explore.questArea+"_"+explore.plyrLoc).text("___");
					explore.plyrLoc++;
					$("#"+explore.questArea+"_"+explore.plyrLoc).text(":o:");
				}else if(explore.isQuesting){
					if($("#"+explore.questArea+"_"+(explore.plyrLoc+1)).text()=="   "){
						this.bridgeBuilder++;
						if(this.bridgeBuilder>explore.plyrLoc*10){
							this.bridgeBuilder++;
							$("#"+explore.questArea+"_"+(explore.plyrLoc+1)).text("___");
							bridgeBuilder=0;
						}
						return;
					}
					$("#opntName").text(enemy.monsterList["0"].name);
					
					var squadStrength=pikmin.squad.strength();
					if(team.party.louie.inParty)
						squadStrength=Math.ceil(squadStrength*team.party.louie.perIncrease);
					
					squadStrength=explore.batman(squadStrength/2,squadStrength);
					
					if(enemy.monsterList["0"].special=="")
						enemy.monsterList["0"].hp-=squadStrength;
					else if(enemy.monsterList["0"].special=="evasive"){
						if(this.batman(0,100)>25)
							enemy.monsterList["0"].hp-=squadStrength;
					}
					
					pikmin.squad.kill(explore.batman(0,enemy.monsterList["0"].attack),enemy.monsterList["0"].status);
					
					$("#opntHP").text(enemy.monsterList["0"].hp);
					$("#plyrHP").text(pikmin.squad.total);
					
					if(pikmin.squad.total<=0){
						this.resetMap();
						return;
					}
					
					if(enemy.monsterList["0"].hp<=0){
						$("#opntHP").text("0");
						for(var i=0;i<Object.size(enemy.monsterList)-1;i++){
							enemy.monsterList[i]=enemy.monsterList[i+1];
						}
						delete enemy.monsterList[Object.size(enemy.monsterList)-1];
						$("#"+explore.questArea+"_"+(explore.plyrLoc+1)).text("___");
					}
				}
			}
			
			if(explore.questArea==2){
				var newMap=$("#map2").html();
				newMap=newMap.replace(/\(|\)/g, function(m) {
					return m === ')' ? '(' : ')';
				});
				$("#map2").html(newMap);
			}
			if(explore.questArea==6){
				var newMap=$("#map6").html();
				newMap=newMap.replace(/\{|\}/g, function(m) {
					return m === '}' ? '{' : '}';
				});
				$("#map6").html(newMap);
			}
		}
	},
	
	resetMap: function(){
		$('#btnStop').hide();
		enemy.monsterList={};
		$(".battleDialog").hide();
		
		var tmpPlace=0;
		while($("#"+explore.questArea+"_"+tmpPlace).length>0){
			if((explore.questArea==8 || explore.questArea==9)&&(tmpPlace>0&&tmpPlace<31))
				$("#"+explore.questArea+"_"+tmpPlace).text("   ");
			else
				$("#"+explore.questArea+"_"+tmpPlace).text("___");
			tmpPlace++;
		}
		
		$('#overworld').show();
		$('#map'+explore.questArea).hide();
		
		if(team.party.olimar.inParty)
			$('#btnSpelunking').show();
		
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
		this.cntEndless++;
		this.blnEndless=false;
		
		var randNumber = this.batman(0,100);
		$('#btnStop').hide();
		$('#btnBomb').hide();
		$('#btnClearSquad').show();
		switch(explore.questArea){
			case 1:
				if(explore.places["1"].timesBeat==0){
					explore.unlock(2);
					team.find("koppad");
					main.alrt("Located KopPad");
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
					team.find("alph");
					main.alrt("Located Alph");
				}else if(randNumber>95){
					items.addRandomThing();
				}else if(randNumber>35 || explore.places["3"].timesBeat%3==0){
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
					team.find("brittany");
				}else if(randNumber>90){
					items.addRandomThing();
				}else if(randNumber>70){
					items.giveBomb();
				}else if(randNumber>50){
					items.givePellet();
				}else{
					items.giveNectar();
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
				}else if(randNumber>48){
					items.givePellet();
				}else{
					items.giveNectar();
				}
				break;
			case 7:
				if(explore.places["7"].timesBeat==0){
					explore.unlock(8);
					explore.unlock(9);
					team.find("charlie");
				}else if(randNumber>90){
					items.addRandomThing();
				}else if(randNumber>70){
					items.giveBomb();
				}else if(randNumber>45){
					items.givePellet();
				}else{
					items.giveNectar();
				}
				break;
			case 8:
				if(explore.places["8"].timesBeat==0){
					explore.unlock(10);
				}
				break;
			case 9:
				if(explore.places["9"].timesBeat==0){
					explore.unlock(11);
					team.find("louie");
				}
				break;
			case 11:
				if(explore.places["11"].timesBeat==0){
					items.give("Pink Onion", 0, "onion");
					explore.unlock(12);
				}else if(randNumber>90){
					items.addRandomThing();
				}else if(randNumber>75){
					items.giveBomb();
				}else if(randNumber>45){
					items.givePellet();
				}else{
					items.giveNectar();
				}
				break;
			case 12:
				if(explore.places["12"].timesBeat==0){
					explore.unlock(13);
					team.find("olimar");
				}else if(randNumber>90){
					items.addRandomThing();
				}else if(randNumber>70){
					items.giveBomb();
				}else if(randNumber>40){
					items.giveNectar();
				}else{
					items.givePellet();
				}
				break;
			case 13:
				if(explore.places["13"].timesBeat==0){
					explore.unlock(14);
					team.find("president");
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
				/*//
				if(explore.places["14"].timesBeat==0){
					
				}else*/ if(randNumber>80){
					items.addRandomThing();
				}else if(randNumber>75){
					items.giveBomb();
				}else{
					items.givePellet();
				}
				
				this.blnEndless=confirm("Explore deeper?");
				break;
			case 16:
				if(randNumber>90){
					items.addRandomThing();
				}else if(randNumber>30){
					items.give("White Candypop", 0, "flower");
				}else{
					items.give("Purple Candypop", 0, "flower");
				}
				break;
		}
		
		$("#"+explore.questArea+"_"+explore.plyrLoc).text("___");
		explore.places[explore.questArea].timesBeat++;
		explore.plyrLoc=0;
		explore.updateSquad();
		
		if(this.blnEndless){
			this.populate(explore.questArea);
		}else{
			$('#overworld').show();
			$('#map'+explore.questArea).hide();
			$(".battleDialog").hide();
			
			if(team.party.olimar.inParty)
				$('#btnSpelunking').show();
			
			explore.questArea=0;
			explore.isQuesting=false;
		}
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
		15: {display: ""			, canGo: true , timesBeat: 0},
		16: {display: "Cave"		, canGo: true , timesBeat: 0}
	}
};