export default class WorldElementType {
	static toCrafty()
	{
		Crafty.c('WorldElement', {
		  			init: function() {
					},
					
					centerOffset : function() {
						var xCenterOffset =  this._w/2;
						var yCenterOffset =  this._h/2;
						return {x:xCenterOffset, y:yCenterOffset};
					},
					
					centerPosition: function() {
						var offset = this.centerOffset();
						return {x:this._x + offset.x, y:this._y+offset.y };
					},
					
					centerPosFromPosition: function(locXY)
					{
						var offset = this.centerOffset();
						return {x:locXY.x + offset.x, y:locXY.y + offset.y};
					},
					
					positionFromCenterPos: function(locXY)
					{
						var offset = this.centerOffset();
						return {x:locXY.x - offset.x, y:locXY.y - offset.y};
					}
					
					
				});
	}
}