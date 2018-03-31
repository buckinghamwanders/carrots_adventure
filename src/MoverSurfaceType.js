
/*

Defines a crafty type for surface that react with the movertype

*/
export default class MoverSurfaceType {
	static toCrafty()
	{
			
		Crafty.c("MoverSurface", {
					_friction : 1,
					_absorption : 1,
					_bounce : 0,
					_stability : 0.5,

					init: function() {
						

		  			},
					
					toString : function()
					{
						return "MoverSurface [ friction: "+this._friction+" _absorption: "+this._absorption+" bounce: "+this._bounce+" ]";
					},
					
					getFriction : function() {
						return this._friction;
					},

					getAbsorption : function() {
						return this._absorption;
					},

					intitializeSurface : function(friction, absorption, bounce, stability)
					{
						this._friction = friction;
						this._absorption = absorption;
						this._bounce = bounce;
						this._stability = stability;
					},

					processCollision : function(mover)
					{
						Crafty.log("MoverSurface: collision . "+this.toString()+" w/ "+mover.toString());
						//How to manage this
						mover.apply(this._bounce,
									this._stability,
									mover.getSpeed() * (this.getFriction()),
									mover.getPower() * (this.getAbsorption()));
					}

		  		});

				
		 
	}
}