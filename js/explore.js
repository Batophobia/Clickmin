var explore = {
	init: function(){
		$('#btnMap').on('click',function(){
			$('#map').show();
			isOnMap=true;
		});
	},
	isQuesting: false,
	isOnMap: false,
};