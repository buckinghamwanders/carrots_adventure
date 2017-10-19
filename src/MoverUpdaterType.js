	
export default class MoverUpdaterType {
	static toCrafty()
	{
			
		Crafty.c("MoverUpdater", {
					_height : 0,
					_power : 0,
					_speed : 0,
					init: function() {
						

		  			},
					
					getPower : function() {
						return this._power;
					},

					getSpeed : function() {
						return this._speed;
					},

					getHeight : function() {
						return this._height;
					},

					processEntry : function(surface)
					{
						this._height = this._height -1;
						if (this._height < 0)
							this._height = 0;
						if (this._height == 0)
						{
							surface.processCollision(this);
						}
					},
					apply : function(newBounce, frictionFactor, absorb)
					{
						this._height  = this._height + newBounce;
					
						this._speed = this._speed - frictionFactor;
						if (this._speed < 0)
							this._speed = 0;
					
						this._power = this._power - absorb;
						if (this._power < 0)
							this._power = 0;

						this.updateController();
					},

					updateController : function ()
					{

					}
					


					   
					
		  		});

				
		 
	}
}