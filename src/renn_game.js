		window.onload =(function() {
			screenWidth = 1000;
			screenHeight = 800;
			textBuffer = 50;
			
		    POWER_RATE_PER_SECOND = 1;

		    numTileWidth = 20;
		    numTileHeight = 14;
			worldStartX = 0;
			worldStartY = textBuffer;
			worldWidth = screenWidth;
			worldHeight = screenHeight - textBuffer;
		    tileWidth = worldWidth/numTileWidth;
		    tileHeight = worldHeight/numTileHeight;
		    tileX = 0;
		    tileY = 3;
		    colorIdx = 0;
			
			var moveRuleLibrary = {
				defaultRule: {
					name: "Default",
					
					move:function(mover) {
						var jump = 1;
						return {x: Math.cos(Crafty.math.degToRad(mover._rotation) )* tileWidth *jump, y: Math.sin(Crafty.math.degToRad(mover._rotation) ) * tileWidth *jump};
					},
					
					//return false if done
					//return true to return
					processMoved:function(mover) {
						var ret = false;
						return ret;
					}
				},
				
				power2Rule: {
					name:"Power2",
					
					move:function(mover) {
						var jump = Math.floor(2 * mover._power);
						return {x: Math.cos(Crafty.math.degToRad(mover._rotation) )* tileWidth *jump, y: Math.sin(Crafty.math.degToRad(mover._rotation) ) * tileWidth *jump};		
					},
					
					//return false if done
					//return true to return
					processMoved:function(mover) {
						var ret = false;
						return ret;
					}
				}
			};
			
			var tileActions = {
				forceBounce : {
					apply:function(mover) {
						mover.trigger("CarrotBounce");
					}
				},
				
				death : {
					apply:function(mover) {
						Crafty.log("Death");
						Crafty.trigger("ResetWorld");
					}
				}
			};
			
			var tileMaker = {
				pinkTile: function(tile)
				{
					var color = "FFAAAA";
	       			tile._enterActions = [tileActions.forceBounce];
					tile.enterRule = [moveRuleLibrary.power2Rule];
	                tile.color(color)
	               ;
				},
				yellowTile: function(tile)
				{
					var color = "00FFFF";
	       			tile._enterActions =[];
					tile.enterRule = [moveRuleLibrary.defaultRule];
	                tile.color(color)
	               ;
				},
				greenTile: function(tile)
				{
					var color = "00FF00";
	       			tile._enterActions = [];
					tile.enterRule = [moveRuleLibrary.defaultRule];
	                tile.color(color)
	               ;
				},
				blueTile: function(tile)
				{
					var color = "AAAAFF";
	       			tile._enterActions = [];
					tile.enterRule = [moveRuleLibrary.defaultRule];
	                tile.color(color)
	               ;
				},
				redTile: function(tile)
				{
					var color = "FF0000";
	       			tile._enterActions = [];
					tile.enterRule = [moveRuleLibrary.defaultRule];
	                tile.color(color)
	               ;
				},
				
				deathTile: function(tile)
				{
					var color = "000000";
	       			tile._enterActions = [tileActions.death];
					tile.enterRule = [moveRuleLibrary.defaultRule];
	                tile.color(color)
	               ;
				}
				
				
			};
			
			
			
			var tileManager = {
				update : function () {
					Crafty("Tile").each(function (t) {
						var e = Crafty(t);
						if (!Crafty.viewport.onScreen(e))
						{
						//	Crafty.log("Is Off Screen: "+e.x+" , "+e.y);
						}
						
					});
				}
			}
			
			var factory = {
				index: 0,
				reset : function(tiles,offset)
				{
					for (var tileIdx = 0; tileIdx < tiles.length; tileIdx++)
					{
						tiles[tileIdx].x += offset;//worldWidth;
						//tiles[tileIdx].y = 0;
						//tiles[tileIdx].color("FF00FF")
						var changeFunctions = Object.keys(tileMaker);
						var index = (Math.floor(changeFunctions.length * Math.random())) % changeFunctions.length;
						var cFunc = tileMaker[changeFunctions[index]];
						cFunc(tiles[tileIdx]);
						Crafty.log("Reseting Tile to "+tiles[tileIdx].x+" , "+tiles[tileIdx].y);
					}
				}
				
			}
			
			var stageManager = {
				reset : function () {
					var offset = {
						x:Crafty.viewport.x,
						y:Crafty.viewport.y
					}
					
					Crafty.log("Stage Offset x:"+offset.x+" y: "+offset.y);
					Crafty.log("Stage Rect x:"+Crafty.viewport.bounds.min.x+" y: "+Crafty.viewport.bounds.min.y);
					
					var elements = Crafty("WorldElement").get();
					var removers = [];
					for (var elIdx = 0; elIdx < elements.length; elIdx++)
					{
						var el = elements[elIdx];
						Crafty.log("Stage Offset Carrots :"+el.x+" y: "+el.y+" viewPort.x "+Crafty.viewport.x);
						if (el._x  + Crafty.viewport._x < 0)
						{
							Crafty.log("  Remove Offset Carrots :"+el.x+" y: "+el.y);
							
							removers.push(el);
						}
						{
							el.x = el.x +offset.x;
							el.y = el.y + offset.y;
							Crafty.log(" Update Offset Carrots :"+el.x+" y: "+el.y);
						}
					}
					factory.reset(removers,worldWidth);
				}
			}
			
		    	Crafty.init(screenWidth,screenHeight);

		    	Crafty.sprite(64, "images/carrots.png", {
		    		Carrots: [0,0]
		    	});
		    	Crafty.sprite(64, "images/target.png", {
		    		TargetImage: [0,0]
		    	});
				
			  var scoreLabel = Crafty.e('2D, DOM, Text')
			    .attr({
			      x: 100,
			      y: 10
			    });
				
				scoreLabel.text('score: ');
				Crafty.c('MoveRule', {
					
					_move: function(mover)
					 {
						 return {x:0,y:0};
					},
							
		  			init: function() {
					//	this._defineMoveRuleProperties();
		  			}
					
				});
				
				Crafty.c('WorldElement', {
		  			init: function() {
					}
				});
				Crafty.c('MoveCoordinator', {
					activeMoves : {},
				
		  			init: function() {
					},
					
					registerMoveRule: function(mover,rule) {
						var id = this.calculateIdString(mover)
						if (! this.activeMoves.hasOwnProperty (id))
					 	{
							this.activeMoves[id] = [];
						}
						this.activeMoves[id].push(rule);
						Crafty.log("Registered Moves: "+this.activeMoves[id].map((r)=>r.name).join());
					},
					
					unregisterMoveRule: function(mover,rule) {
						var id = this.calculateIdString(mover)
						if ( this.activeMoves.hasOwnProperty (id))
					 	{
							var pos = this.activeMoves[id].indexOf(rule);
							if (pos != -1)
								this.activeMoves[id].splice(pos,1);
							Crafty.log("Registered Moves: "+this.activeMoves[id].map((r)=>r.name).join());
						}	
							
					},
					
					move:function(mover) {
						var id = this.calculateIdString(mover)
						if ( this.activeMoves.hasOwnProperty (id))
					 	{
							return this.activeMoves[id].reduce((accum,rule,idx,arr)=>this.addMoves(accum,rule.move(mover)),{x:mover._x,y:mover._y});		
						}
						return {x:0,y:0};
					},
					
					moveCompleted:function(mover) {
						var id = this.calculateIdString(mover)
						if ( this.activeMoves.hasOwnProperty (id))
					 	{
							return this.activeMoves[id] = this.activeMoves[id].filter((rule)=>rule.processMoved(mover));		
						}
						return {x:0,y:0};
					},
					
					addMoves:function(move1,move2) {
						return {x:move1.x+move2.x,y:move2.y+move1.y};
					},
					
					calculateIdString: function(mover) {return mover.getId();}
					
				});
				
				var moveCoordinator = Crafty.e('MoveCoordinator');
				var moveRule1 = Crafty.e('MoveRule').attr( {move:function(mover){return {x:1,y:0}}});
			  	var scoreText = Crafty.e('2D, DOM, Text')
			   	 .attr({
			      x: 150,
			      y: 10
			    }).bind("EnterFrame", function(eventData) {
				    // Move to the right by 10 pixels per second
					var aRabbit = Crafty("Rabbit").get(0);
				    if (aRabbit === undefined )
						this.text('No rabbit');
					else if (aRabbit.score === undefined)
						this.text('No score');
					else
						this.text (aRabbit._score.toString());
				  });
				
			  var powerLabel = Crafty.e('2D, DOM, Text')
			    .attr({
			      x: 200,
			      y: 10
			    });
				
				scoreLabel.text('score: ');
				
			  var powerText = Crafty.e('2D, DOM, Text')
			    .attr({
			      x: 250,
			      y: 10
			    })
				.bind("EnterFrame", function(eventData) {
				    // Move to the right by 10 pixels per second
					var aRabbit = Crafty("Rabbit").get(0);
				    if (aRabbit === undefined)
						this.text('no rabbit');
					else if ( aRabbit.power === undefined)
						this.text('no power '+rabbit);
					else
				    	this.text(aRabbit._power.toString());
				  });
				
				scoreLabel.text('score: ');
				
				powerLabel.text('power: ');

		  		Crafty.c("Tile", {
					enterRule: [],
					exitRule: [],
			    	_enterActions: [],
					_exitActions: [],
					
		  			init: function() {
						//this._defineTileProperties();
		  				this.jumpSize = 2;
		  				this.jumpFunction = function(e) {
		  					var jump = Math.floor(this.jumpSize * e._power);
		  					return {x:e._x + Math.cos(Crafty.math.degToRad(e._rotation) )* tileWidth *jump, y:e._y+ Math.sin(Crafty.math.degToRad(e._rotation) ) * tileWidth *jump};
		  					//return {x:e._x + Math.cos(Crafty.math.degToRad(e._rotation) )* tileWidth *2, y:e._y+ Math.sin(Crafty.math.degToRad(e._rotation) ) * tileWidth *2};
		  				}

		  				this.contains = function(l) {
		  					return (l.x >= this._x && l.x < this._x + this._w) &&
		  								 (l.y >= this._y && l.y < this._h + this._y)
		  				}

		  			},
					
					entityEnters: function (obj) {
						//Crafty.log("EnterTile: "+this._x+","+this._y+" obj: "+obj);
						this.enterRule.forEach(function(r) {
								Crafty('MoveCoordinator').get(0).registerMoveRule(obj,r);
							}
						);
						this._enterActions.forEach(function(r) {
							r.apply(obj);
						});
					},
					
					entityExits: function (obj) {
						//Crafty.log("EnterTile: "+this._x+","+this._y+" obj: "+obj);
						this.enterRule.forEach(function(r) {
								Crafty('MoveCoordinator').get(0).unregisterMoveRule(obj,r);
							}
						);
					},
					
					enterAction: function(obj)
					{
						if (obj != null && obj != undefined)
							this._enterActions.push(obj);
						return this;
					},
					
					exitAction: function(obj)
					{
						if (obj != null && obj != undefined)
							this._exitActions.push(obj);
						return this;
					}		
		  		});

				function findContainingTile(locXY)
				{
	  				for (var tileIdx = 0; tileIdx < tiles.length; tileIdx++)
	  				{

	  					if (tiles[tileIdx].contains(locXY))
	  					{
							var newTile = tiles[tileIdx];
							if (newTile != this.tile)
							{
								if (this.tile == undefined)
									newTile.entityEnters(this);
								this.tile = newTile;
							}	
	  						//this.tile = tiles[tileIdx];
							//Crafty.log("StartTile is "+this.tile);
	  						break;
	  					}
	  				}	
				}
				
				
		   var moveRule = Crafty.e('MoveRule').attr({moveRule:function(e) {
				var jump = Math.floor(2 * e._power);
				return {x:e._x + Math.cos(Crafty.math.degToRad(e._rotation) )* tileWidth *jump, y:e._y+ Math.sin(Crafty.math.degToRad(e._rotation) ) * tileWidth *jump};
			
		   }})

		    var colors = ["FFFF00", "FF0000", "FFFF00", "00FF00", "FFFF00", "0000FF"];
		    for (x = 0; x < numTileWidth; x++)
		   	{
		    	 for (y = 0; y < numTileHeight; y++)
		  		 {
					 var color = selectATileColor();
					 var enterAction = null;
					 if (color == "FF0000")
					 {
						 enterAction = tileActions.forceBounce;
    		       			 Crafty.e('2D, DOM, Color, Tile,WorldElement')
    		               .attr({x: worldStartX+ x*tileWidth, y:worldStartY+ y*tileHeight, z:1,w: tileWidth, h: tileHeight,enterRule:[moveRuleLibrary.defaultRule],_enterActions:[tileActions.forceBounce]})
    		               .color(color)
    		               ;
					 }
					 else {
  		       			 Crafty.e('2D, DOM, Color, Tile,WorldElement')
  		               .attr({x: worldStartX+ x*tileWidth, y:worldStartY+ y*tileHeight, z:1,w: tileWidth, h: tileHeight,enterRule:[moveRuleLibrary.power2Rule]})
  		               .color(color)
  		               ;
					 }	
		  		}
		    }

			

		  	Crafty.c("Rabbit", {
					_power : 0,
					_startPower: -1,
					
					_score : 99,
					tile : null,
			    	
					
		  			init: function() {
		  				this.requires('2D, Keyboard,Controls, Color');
		  				Crafty.log("Initializing Carrots: "+this.getId());
						
		  				Crafty.log("Initializing Carrots: score"+this._score);
						
		  				var tiles = Crafty("Tile").get();
		  				
		  				z = 10;

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
							var coordinatorXY = Crafty('MoveCoordinator').get(0).move(this);
  							this._power = 1.0;
  							var tiles = Crafty("Tile").get();
  							for (var tileIdx = 0; tileIdx < tiles.length; tileIdx++)
  							{
  								if (tiles[tileIdx].contains(coordinatorXY))
  								{
  									//this.x = coordinatorXY.x;
  									//this.y = coordinatorXY.y;
									Crafty.log("Tweening - "+this);
									Crafty('MoveCoordinator').get(0).moveCompleted(this);
									this.tween({x:coordinatorXY.x,y:coordinatorXY.y}, 1000);
									//this.tile.entityExits(this);
									if (this.tile != undefined)
										this.tile.entityExits(this);
									
									//this.tile = tiles[tileIdx];
									//this.tile.entityEnters(this);
									this.one("TweenEnd",function(){
	  									Crafty.log("Got tween end.");
										tileManager.update();
										stageManager.reset();
										this.tile.entityEnters(this);
									
									});
									//this._power = 1;
  									
  									break;
  								}
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
										if (this.tile == undefined)
											newTile.entityEnters(this);
										this.tile = newTile;
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
				  				
			  					if (this.tile === undefined)
								{
								
								}						
								else
								{
									locXY = this.tile.jumpFunction(this);
									this._target.x = locXY.x;
				  					this._target.y = locXY.y;
			  					}								
			  				}
		  			  });
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
						var newTile = findTile({x:x,y:y});
						if (newTile != undefined)
							this.entityEnters(this);
					}
		  		});

		  		Crafty.c("Target", {
		  			init: function() {
		  				this.requires('2D,  Color');
		  				Crafty.log("Initializing Target");

		  			}
		  		});
				
				
				Crafty.c("GameManager", {
		  			init: function() {
		  				this.bind("ResetWorld", function() {
		  					factory.reset(Crafty("Tile").get(),0);
							Crafty("Rabbit").each(function(r) {
								var x = worldStartX+ tileX*tileWidth;
								var y = worldStartY+ tileY*tileHeight;
								this.forceLocation(x,y);
							});
							
		  				});

		  			}
				});
				
				
		  		//Make a sprite
		  		var rabbitTarget = Crafty.e('2D, DOM, Color, Target, TargetImage, WorldElement')
		  		.color("Pink")
		               .attr({x: worldStartX+ (tileX+2)*tileWidth, y: worldStartY+ tileY*tileHeight, z:10,w: tileWidth, h: tileHeight})

		  		 //Now need to add rabbitTarget to the rabit
		  		var rabbit =  Crafty.e('2D, DOM, Color, Keyboard,Controls,Rabbit,Carrots,Tween,WorldElement')
		  	    .origin("center")
		  	    .attr({x: worldStartX+ tileX*tileWidth, y: worldStartY+ tileY*tileHeight, z:10, w: tileWidth, h: tileHeight,score:0,power:0, startPower:-1})
		  	    .color("Pink")
		  		.target(rabbitTarget)
		  	    ;
				
				var gameManager = Crafty.e('GameManager');
				
				Crafty.viewport.bounds = {min:{x:0, y:0}, max:{x:500, y:500}};
				
				Crafty.viewport.clampToEntities = false;
				Crafty.one("CameraAnimationDone", function() {
				    Crafty.viewport.follow(rabbit, 0, 0);
				});
				Crafty.viewport.centerOn(rabbit, 1000);
				
				Crafty.log("rabbit: "+rabbit.getId());
				Crafty.log("Robbit score: "+rabbit.score);
				
			



		  function selectATileColor()
		   {
		  	 colorIdx++;
		  	 colorIdx = colorIdx % colors.length;
		  		return colors[colorIdx]
		    }
			
			function findTile(locXY)
			{
  				var tiles = Crafty("Tile").get();
  				var ret;
  				for (var tileIdx = 0; tileIdx < tiles.length; tileIdx++)
  				{

  					if (tiles[tileIdx].contains(locXY))
  					{
						ret = tiles[tileIdx];
						break;
  					}
  				}
				return ret;
			}
			
        });
