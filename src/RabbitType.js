import {stageManager,CarrotGame,CENTER_TIME,POWER_RATE_PER_SECOND} from './CarrotGame.js';
import {transitions, TransitionTable} from './TransitionTable.js';

	
const STANDARD_MILLISECOND_PER_SQUARE = 750;

export default class RabbitType {
	static toCrafty()
	{
		Crafty.c("Rabbit", {
					_power : 0,
					_startPower: -1,
					_minLaunchPower:0,
					_powerRate:POWER_RATE_PER_SECOND,
					_score : 0,
					_lastJump: 0,
					tile : null,
					bouncing: false,
					
		  			init: function() {
		  				this.requires('2D, Keyboard,Controls, Color, MoverUpdater');
		  				Crafty.log("Initializing Carrots: "+this.getId());
						
		  				Crafty.log("Initializing Carrots: score"+this._score);
						
		  				var tiles = Crafty("Tile").get();
		  				
		  				var z = 10;

						//this._defineRabbitProperties();
						
		  				
						
			  	      	  	this.bind("KeyDown", function(e) {
			  	  				//on keydown, set the move booleans
			  				    Crafty.log("Got key down: e");
								if(e.keyCode === Crafty.keys.RIGHT_ARROW) {
									this.rotation = 0;//this._rotation+90;
								} else if(e.keyCode === Crafty.keys.UP_ARROW) {
									this.rotation = 270;

			  	 			    }
			  	 			     else if(e.keyCode === Crafty.keys.LEFT_ARROW) {
									this.rotation = 180;

			  	 			    } 
			  	 			    else if(e.keyCode === Crafty.keys.DOWN_ARROW) {
									this.rotation = 90;

			  	 			    }else if(e.keyCode === Crafty.keys.SPACE) {
			  						 this.beginPower();
			  	  				}
			  	  			});



			  		    	this.bind("KeyUp", function(e) {
			  		  				//on keydown, set the move booleans
			  					Crafty.log("Got key up: e");
			  		  			if(e.keyCode === Crafty.keys.SPACE) {
		  							/*var d = new Date();
	  								var delta = d.getTime() - this._startPower;
		               			 	var powerStep = POWER_RATE_PER_SECOND * delta / 1000.0;
		  							Crafty.log("PowerStep: "+powerStep);*/
	  								this._power = this.currentPower();//1.0+ powerStep;
		  							this.releasePower();
		      						
	  								
									this.trigger("CarrotBounce");							
			  		  			}
							}
		  					);

						this.bind("CarrotBounce", function(e) {
  		  					//this.x = this._x + Math.cos(Crafty.math.degToRad(this._rotation) )* tileWidth *2;
  							//this.y = this._y+ Math.sin(Crafty.math.degToRad(this._rotation) ) * tileWidth *2;
  							//if (this.tile !== undefined)
							//	locXY = this.tile.jumpFunction(this);
							if (this.bouncing)
								return;
							this.bouncing = true;
							this.start(this._power,this._power,this._power);
							this._startPower = -1;
  							var coordinatorXY = Crafty('MoveCoordinator').get(0).move(this);
  							this._power = 1.0;
  							this._height = this._power;
  							var tiles = Crafty("Tile").get();
  							var foundTile = false;
  							for (var tileIdx = 0; tileIdx < tiles.length; tileIdx++)
  							{
  								if (tiles[tileIdx].contains(coordinatorXY))
  								{
  									//this.x = coordinatorXY.x;
  									//this.y = coordinatorXY.y;
									var newTile = tiles[tileIdx];
									foundTile = true;
									Crafty.log("Tweening - "+this);
									Crafty('MoveCoordinator').get(0).moveCompleted(this);
									var tileCenter = newTile.centerPosition();
									var newLoc = this.positionFromCenterPos(tileCenter);
									this._lastJump = newLoc.x - this._x;

									let timeToMove = this._MUHeight * STANDARD_MILLISECOND_PER_SQUARE/ this._MUSpeed;
									this.tween({x:newLoc.x,y:newLoc.y}, timeToMove);
									this.targetTile = newTile;
									//this.tile.entityExits(this);
									if (newTile != this.tile)
									{

										if(this.tile != undefined)
											this.tile.entityExits(this);
										
										this.one("TweenEnd",function(){
											this.bouncing = false;
		  									Crafty.log("Got tween end.");
											this.endBounce();
											var newTile = CarrotGame.findTile({x:this._x,y:this._y});
											if (newTile != undefined)
											{
												var tileCenter = newTile.centerPosition();
												var newLoc = this.positionFromCenterPos(tileCenter);
												this.x = newLoc.x;
												this.y = newLoc.y;
												this.updateTile(newTile);
												newTile.entityEnters(this);
												
												
												/*this.tile = newTile;
												table.innerHTML = this.tile.getIdStr();*/
											}
											//Crafty.viewport.centerOn(this, CENTER_TIME);
											if (this._lastJump > 0 && this.isSetteled() == 1) 
											{
												CarrotGame.StageManager().reset({
																	x:this._lastJump,
																	y:0
																});
											}
											
											
										});
									}
									else {
										this.bouncing = false;
		  									
									}
									//this._power = 1;
  									
  									break;
  								}
  							}
  							if (!foundTile)
  							{
  								this.bouncing = false;
  							}
						});
						
						
		  				this.bind("EnterFrame", function(eventData) {
			  				var locXY = {x:this._x,y:this._y};
			  				for (var tileIdx = 0; tileIdx < tiles.length; tileIdx++)
			  				{

			  					if (tiles[tileIdx].contains(locXY))
			  					{
									var newTile = tiles[tileIdx];
									if (newTile != this.tile)
									{
										if (this.tile != newTile && this.tile != null)
											this.tile.entityExits(this);
										if (this.tile == undefined)
											newTile.entityEnters(this);
										this.updateTile(newTile);
										
										/*this.tile = newTile;
										table.innerHTML = this.tile.getIdStr();*/
									}	
			  						//this.tile = tiles[tileIdx];
									//Crafty.log("StartTile is "+this.tile);
			  						break;
			  					}
			  				}
		  					if (this._startPower != -1)
			  				{
			  					this._power =  this.currentPower();
			  					//Crafty.log("Frame PowerStep: "+this._power+" delta "+delta+" startPower "+this._startPower);
			  				}
							if (!this.bouncing)
							{
			  					if (this.tile === undefined)
								{
								
								}						
								else
								{
									//locXY = this.tile.jumpFunction(this);
									locXY = Crafty('MoveCoordinator').get(0).move(this);
  									var posXY = this._target.positionFromCenterPos(locXY);
									this._target.x = posXY.x;
				  					this._target.y = posXY.y;
			  					}					
							}
							else {
							//	this._target.x = this.x;
				  			//	this._target.y = this.y;
							}
							
		  			  });
					  
		  			},

		  			scalePower: function(scalor)
		  			{
		  				this._powerRate = POWER_RATE_PER_SECOND * scalor;
		  			},
		  			beginPower : function()
		  			{
		  				this._minLaunchPower = 1.0;
			  			var d = new Date();
			  			this._startPower = d.getTime();
			  			this._powerRate = POWER_RATE_PER_SECOND;
			            Crafty.log("Setting power "+this.power)
		  			},
		  			releasePower : function()
		  			{
		  				//this._storedPower = this.currentPower();
		  				this._minLaunchPower = 1;
		  			},
		  			currentPower : function()
		  			{
		  				var d = new Date();
	  					var delta = d.getTime() - this._startPower;
		               	return this._minLaunchPower + (this._powerRate * delta / 1000.0);
		  			} ,
		  			currentHeight : function() 
		  			{
		  				return this.getHeight() + this.getNewReleaseHeight();
		  			},
		  			getNewReleaseHeight: function()
		  			{
		  				if (this._startPower == -1)
		  					return 0;
		  				return this.currentPower();
		  			},

		  			setManager : function (sManager) {
		  				this.stageManager = sManager;

		  			},
		  			getManager : function () 
		  			{
		  				return this.stageManager;
		  			},
		  			target : function(t) {
		  				this._target = t;
		  				return this._target;
		  			},
					
					removeLocation : function() {
						if (this.tile != undefined)
							this.tile.entityExits(this);
						this.tile = undefined;
					},

					forceLocation : function(x,y) {
						if (this.tile != undefined)
							this.tile.entityExits(this);
						this.x = x;
						this.y = y;
						var newTile = CarrotGame.findTile({x:x,y:y});
						if (newTile != undefined)
						{
							newTile.entityEnters(this);
							this.updateTile(newTile);
						}	

					},

					updateTile : function(newTile)
					{
						let oldTileId = "";
						let newTileId = "";
						if (this.tile != undefined)
						{
							oldTileId = this.tile.getIdStr();
							newTileId = newTile.getIdStr();
							transitions.parseTransition(this.getId(),oldTileId,newTileId);
						}	
						this.tile = newTile;
						CarrotGame.Table().innerHTML = this.tile.getIdStr();
						let currPattern = CarrotGame.PatternLibrary().FindPattern(this.tile.getIdStr()).name();
						let transitionsDisplay = "<table>";
						CarrotGame.PatternLibrary().PatternNames().forEach(function(pName) {
							transitionsDisplay = transitionsDisplay + "<tr>"+"<td>"+pName + "</td><td>"+ transitions.likelihoodTransition(currPattern,pName).toString()+"</td></tr>";
						})
						transitionsDisplay = transitionsDisplay +"</table>";
						transitionTable.innerHTML = transitionsDisplay;
					},

					applyScore: function(s)
					{
						this._score = this._score + s;
					},

					tileMoveWidth : function ()
					{
						return CarrotGame.getTileWidth();
					}
		  		});

	}
}
