import {stageManager,CarrotGame,CENTER_TIME,POWER_RATE_PER_SECOND} from './CarrotGame.js';
import {transitions, TransitionTable} from './TransitionTable.js';

	
export default class RabbitType {
	static toCrafty()
	{
		Crafty.c("Rabbit", {
					_power : 0,
					_startPower: -1,
					
					_score : 0,
					tile : null,
					bouncing: false,
					
		  			init: function() {
		  				this.requires('2D, Keyboard,Controls, Color');
		  				Crafty.log("Initializing Carrots: "+this.getId());
						
		  				Crafty.log("Initializing Carrots: score"+this._score);
						
		  				var tiles = Crafty("Tile").get();
		  				
		  				var z = 10;

						//this._defineRabbitProperties();
						
		  				
						
			  	      	  	this.bind("KeyDown", function(e) {
			  	  				//on keydown, set the move booleans
			  				    Crafty.log("Got key down: e");
								if(e.keyCode === Crafty.keys.RIGHT_ARROW) {
									this.rotation = this._rotation+90;
								} else if(e.keyCode === Crafty.keys.LEFT_ARROW) {
									this.rotation = this._rotation - 90;

			  	 			    } else if(e.keyCode === Crafty.keys.SPACE) {
			  						  this._power = 1.0;
			  						    var d = new Date();
			  						    this._startPower = d.getTime();
			                  		  Crafty.log("Setting power "+this.power)
			  	  				}
			  	  			});



			  		    	this.bind("KeyUp", function(e) {
			  		  				//on keydown, set the move booleans
			  					Crafty.log("Got key up: e");
			  		  			if(e.keyCode === Crafty.keys.SPACE) {
		  							var d = new Date();
	  								var delta = d.getTime() - this._startPower;
		               			 	var powerStep = POWER_RATE_PER_SECOND * delta / 1000.0;
		  							Crafty.log("PowerStep: "+powerStep);
	  							
		      						this._power = 1.0+ powerStep;
		  							this._startPower = -1;
	  							
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
							var coordinatorXY = Crafty('MoveCoordinator').get(0).move(this);
  							this._power = 1.0;
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
									
									this.tween({x:newLoc.x,y:newLoc.y}, 1000);
									//this.tile.entityExits(this);
									if (this.tile != undefined)
										this.tile.entityExits(this);
									
									this.one("TweenEnd",function(){
										this.bouncing = false;
	  									Crafty.log("Got tween end.");
										CarrotGame.StageManager().reset({
																x:Crafty.viewport.x,
																y:Crafty.viewport.y
															});
										var newTile = CarrotGame.findTile({x:this._x,y:this._y});
										if (newTile != undefined)
										{
											newTile.entityEnters(this);
											this.updateTile(newTile);
											/*this.tile = newTile;
											table.innerHTML = this.tile.getIdStr();*/
										}
										Crafty.viewport.centerOn(this, CENTER_TIME);
									
									});
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
										if (this.tile != newTile)
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
			  					var d = new Date();

			  					var delta = d.getTime() - this._startPower;
			  					var powerStep = POWER_RATE_PER_SECOND * delta / 1000.0;
			  					this._power =  1.0 + powerStep;
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
								this._target.x = this.x;
				  				this._target.y = this.y;
							}
							
		  			  });
					  
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
