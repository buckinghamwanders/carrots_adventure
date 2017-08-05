export default class TargetType {
	static toCrafty()
	{
		Crafty.c("Target", {
		  			init: function() {
		  				this.requires('2D,  Color');
		  				Crafty.log("Initializing Target");

		  			}
		  });
	}
}
