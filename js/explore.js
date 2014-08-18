var explore = {
	init: function(){
		if(pikmin.party.total>0)
			$("#btnMap").show();
		
		$('#btnMap').on('click',function(){
			$('#map').show();
			$('#overworld').show();
			$('#btnMap').hide();
			explore.isOnMap=true;
		});
		$('#btnQuest').on('click',function(){
			explore.beginQuest();
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
			$('#btnMap').show();
			explore.isOnMap=false;
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
	},
	isOnMap: false,
	isQuesting: false,
	questArea: 0,
	plyrLoc: 0,
	
	addToSquad: function(clr, type){
		if(type=="bud")
			type="numBud";
		else if(type=="flower")
			type="numFlower";
		else
			type="numLeaf";
		
		if(pikmin.party[clr][type]>0 && pikmin.squad.total<100){
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
	},
	
	unlock: function(input){
		$('.area'+input).on('click',function(){
			$('.squadMaker').show();
			explore.questArea=input;
		});
	},
	
	beginQuest: function(){
		if(pikmin.squad.total>0){
			$('.squadMaker').hide();
			$('#overworld').hide();
			$('#map'+explore.questArea).show();
			explore.isQuesting=true;
			explore.plyrLoc=0;
			explore.populate(explore.questArea);
		}
	},
	
	populate: function(area){
		var tmpEnmy;
		switch(area){
			case 1:
				tmpEnmy = explore.batman(17,24);
				$("#1_"+tmpEnmy).html(enemy.bulborb.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.bulborb);
				
				tmpEnmy = explore.batman(25,32);
				$("#1_"+tmpEnmy).html(enemy.bulborb.display);
				enemy.monsterList[Object.size(enemy.monsterList)]=jQuery.extend({},enemy.bulborb);
				break;
			case 2:
				break;
			case 3:
				break;
			case 4:
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
		if(explore.isQuesting){
			if(explore.canMove()){
				$("#"+explore.questArea+"_"+explore.plyrLoc).text("___");
				explore.plyrLoc++;
				$("#"+explore.questArea+"_"+explore.plyrLoc).text(":o:");
			}else{
				$("#opntName").text(enemy.monsterList["0"].name);
				$(".battleDialog").show();
				var squadStrength=pikmin.squad.strength();
				squadStrength=explore.batman(squadStrength/2,squadStrength);
				
				enemy.monsterList["0"].hp-=squadStrength;
				pikmin.squad.kill(explore.batman(0,enemy.monsterList["0"].attack),enemy.monsterList["0"].status);
				
				$("#opntHP").text(enemy.monsterList["0"].hp);
				$("#plyrHP").text(pikmin.squad.total);
				
				if(enemy.monsterList["0"].hp<=0){
					for(var i=0;i<Object.size(enemy.monsterList)-1;i++){
						enemy.monsterList[i]=enemy.monsterList[i+1];
					}
					delete enemy.monsterList[Object.size(enemy.monsterList)-1];
					$("#"+explore.questArea+"_"+(explore.plyrLoc+1)).text("___");
					$(".battleDialog").hide();
				}
			}
			
			if(explore.questArea==1){
				var newMap=$("#map1").html();
				newMap=newMap.replace(/\(|\)/g, function(m) {
					return m === ')' ? '(' : ')';
				});
				$("#map1").html(newMap);
			}
		}
	},
	
	finish: function(){
		$("#"+explore.questArea+"_"+explore.plyrLoc).text("___");
		$('#overworld').show();
		$('#map'+explore.questArea).hide();
		explore.places[explore.questArea].timesBeat++;
		explore.questArea=0;
		explore.plyrLoc=0;
		explore.isQuesting=false;
	},
	
	canMove: function(){
		var nextSpot=$("#"+explore.questArea+"_"+(explore.plyrLoc+1)).text();
		if(nextSpot=="___")
			return true;
		else if(nextSpot=="__")
			explore.finish();
		else
			return false;
	},
	
	batman: function(min, max){
		return Math.floor(Math.floor(Math.random() * (max-min)) + min);
	},
	
	places: {
		 0: {display: "Ship"		, canGo: true , timesBeat: 0},
		 1: {display: "Fire Forest"	, canGo: false, timesBeat: 0},
		 2: {display: "Plains"		, canGo: false, timesBeat: 0},
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