	

/**

Defines Crafty type for a mover update type.
Entry that manages moving around on the tiles
*/
const AUTO_POWER_LIMIT = 1;
const MAX_POWER = 5;
const MAX_SPEED = 5;

export default class MoverUpdaterType {
	

	static toCrafty()
	{
			
		Crafty.c("MoverUpdater", {
					_MUHeight : 0,
					_MUPower : 0,
					_MUSpeed : 0,
					_MUSettled : 0,
					init: function() {
						

		  			},
					
					getPower : function() {
						return this._MUPower;
					},

					getSpeed : function() {
						return this._MUSpeed;
					},

					getHeight : function() {
						return this._MUHeight;
					},

					isSetteled : function() {
						return this._MUSettled;
					},

					processEntry : function(surface)
					{
						this._MUHeight = this._MUHeight -1;
						if (this._MUHeight < 0)
							this._MUHeight = 0;
						this._MUHeight = 0;
						Crafty.log("MoverUpdater: processEntry . "+this.toString());
						
						if (this._MUHeight == 0)
						{
							surface.processCollision(this);
						}
						//TODO:

					},

					toString : function()
					{
						return "MoverUpdater [ height: "+this._MUHeight+" power: "+this._MUPower+" speed: "+this._MUSpeed+" ]";
					},

					//apply power
					start : function(height, speed,power)
					{
						this._MUHeight += height;
						this._MUSpeed += speed;
						this._MUPower += power;
						if (this._MUPower > MAX_POWER)
							this._MUPower = MAX_POWER;
						if (this._MUSpeed > MAX_SPEED)
							this._MUSpeed = MAX_SPEED;
						Crafty.log("MoverUpdater: start . "+this.toString());
					},

					resetMover : function()
					{
						this._MUHeight = 0;
						this._MUSpeed = 0;
						this._MUPower = 0;
					},
					endBounce : function()
					{
						this._MUHeight = 0;
					},

					apply : function(newBounce,stability, frictionFactor, absorb)
					{
						this._MUHeight  = this._MUHeight + newBounce;
					
						this._MUSpeed = this._MUSpeed - frictionFactor;
						if (this._MUSpeed < 0)
							this._MUSpeed = 0;
					
						this._MUPower = this._MUPower - absorb;
						if (this._MUPower < 0)
							this._MUPower = 0;
						Crafty.log("MoverUpdater: apply . "+this.toString());
						this.updateController(stability);
					},

					updateController : function (stability)
					{
						//start basic power
						this._MUSettled = 1;
						let effectivePower = this._MUPower*this._MUSpeed;
						if (effectivePower < 0)
							effectivePower = 0;

						let effectiveStop = stability * MAX_POWER;
						if (effectiveStop < 0)
							effectiveStop = 0;
						if (this._MUHeight >= 1)
						{
							this._power = 0;
							this._MUSpeed = 1;
							this.trigger("CarrotBounce");	
						}
						else if (effectivePower > effectiveStop)
						{
							this.beginPower();
							let timedPower = (1.0 - stability) * (1.0- this._MUPower/MAX_POWER);
							
							this._minLaunchPower = this.calculateMinPower();
							if (this.isStartPower())
							{
								this.beginPower();
								this.scalePower(0.5);
							}
							let delayTime = this.powerToDelay(timedPower);
							Crafty.e("MoveCoordinator").startMoveClock(this,delayTime);
						
						}
						if (this._MUSpeed >= 1)
						{
							this._power = 0;
							//this._MUSpeed = 1;
							this._MUHeight = 1;
							this._MUSettled = 0;
							this.trigger("CarrotBounce");	
						}
						else {
							this._minLaunchPower = 0;
						}


					},

					calculateMinPower : function()
					{
						return this._MUPower * 0.1;
					},

					isStartPower : function()
					{
						return true;
					},

					powerToDelay : function(timedPower)
					{
						Crafty.log("PowerToDelay: momentum "+timedPower);
						return 3000 * timedPower;
					}
					
		  		});

				
		 
	}
}