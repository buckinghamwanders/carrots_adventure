export default class MoverSurfaceType {
	static toCrafty()
	{
			
		Crafty.c("MoverSurface", {
					_friction : 1,
					_absorption : 1,
					_bounce : 0,
					init: function() {
						

		  			},
					
					getFriction : function() {
						return this._friction;
					},

					getAbsorption : function() {
						return this._absorption;
					},

					processCollision : function(mover)
					{
						//How to manage this
						mover.apply(this._bounce,
									mover.getSpeed() * this.getFriction(),
									mover.getPower() * this.getAbsorption());
					}


					   
					
		  		});

				
		 
	}
}