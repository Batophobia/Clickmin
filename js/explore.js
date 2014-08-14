var explore = {
	init: function(){
		if(pikmin.party.total>0)
			$("#btnMap").show();
		
		$('#btnMap').on('click',function(){
			$('#map').show();
			isOnMap=true;
		});
	},
	isQuesting: false,
	isOnMap: false,
};