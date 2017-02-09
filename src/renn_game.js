		window.onload =(function() {
			screenWidth = 500;
			screenHeight = 400;
			textBuffer = 50;
			
		    POWER_RATE_PER_SECOND = 1;

		    numTileWidth = 10;
		    numTileHeight = 7;
			worldStartX = 0;
			worldStartY = textBuffer;
			worldWidth = screenWidth;
			worldHeight = screenHeight - textBuffer;
		    tileWidth = worldWidth/numTileWidth;
		    tileHeight = worldHeight/numTileHeight;
		    tileX = 0;
		    tileY = 3;
		    colorIdx = 0;
			
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
				
				Crafty.c('MoveCoordinator', {
					activeMoves : {},
				
					registerMoveRule: function(mover,rule) {
						var id = this.calculateIdString(mover)
						if (! this.activeMoves.hasOwnProperty (id))
					 	{
							this.activeMoves[id] = [];
						}
						this.activeMoves[id].push(rule);
					},
					
					unregisterMove: function(mover,rule) {
						var id = this.calculateIdString(mover)
						if ( this.activeMoves.hasOwnProperty (id))
					 	{
							var pos = this.activeMoves[id].indexOf(rule);
							if (pos != -1)
								this.activeMoves[id].splice(pos,1);
						}
						
					},
					
					move:function(mover) {
						var id = this.calculateIdString(mover)
						if ( this.activeMoves.hasOwnProperty (id))
					 	{
							return this.activeMoves[id].reduce((accum,rule,idx,arr)=>this.addMoves(accum,rule.move(mover)),{x:0,y:0});
							
						}
						return {x:0,y:0};
					},
					
					addMoves:function(move1,move2) {
						return {x:move1.x+move2.x,y:move2.y+move1.y};
					},
					
					calculateIdString: function(mover) {return mover.getId();}
					
				});
				
				var moveCoordinator = Crafty.e('MoveCoordinator');
				
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
						this.text (aRabbit.score.toString());
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
				    	this.text(aRabbit.power.toString());
				  });
				
				scoreLabel.text('score: ');
				
				powerLabel.text('power: ');

		  		Crafty.c("Tile", {
		  			init: function() {
		  				this.jumpSize = 2;
		  				this.jumpFunction = function(e) {
		  					var jump = Math.floor(this.jumpSize * e.power);
		  					return {x:e._x + Math.cos(Crafty.math.degToRad(e._rotation) )* tileWidth *jump, y:e._y+ Math.sin(Crafty.math.degToRad(e._rotation) ) * tileWidth *jump};
		  					//return {x:e._x + Math.cos(Crafty.math.degToRad(e._rotation) )* tileWidth *2, y:e._y+ Math.sin(Crafty.math.degToRad(e._rotation) ) * tileWidth *2};
		  				}

		  				this.contains = function(l) {
		  					return (l.x >= this._x && l.x < this._x + this._w) &&
		  								 (l.y >= this._y && l.y < this._h + this._y)
		  				}

		  			},
					
					entityEnters: function (obj) {
						Crafty.log("EnterTile: "+this._x+","+this._y+" obj: "+obj)
					},
					
					entityExits: function (obj) {
						Crafty.log("EnterTile: "+this._x+","+this._y+" obj: "+obj)
					}
		  		});

		   

		    var colors = ["FFFF00", "FF0000", "FFFF00", "00FF00", "FFFF00", "0000FF"];
		     for (x = 0; x < numTileWidth; x++)
		   	{
		    		for (y = 0; y < numTileHeight; y++)
		  		 {
		       		Crafty.e('2D, DOM, Color, Tile')
		               .attr({x: worldStartX+ x*tileWidth, y:worldStartY+ y*tileHeight, z:1,w: tileWidth, h: tileHeight})
		               .color(selectATileColor())
		               ;
		  		}

		    }

		  	Crafty.c("Rabbit", {
					_power : 0,
					_startPower: -1,
					
					_score : 99,
					tile : null,
			    	_Rabbit_property_definitions : {
			           power: {
			               set: function (v) {
			                   this._attr('_power', v);
			               },
			               get: function () {
			                   return this._power;
			               },
			               configurable: true,
			               enumerable: true
			           },
			           _power: {enumerable:false},
			           score: {
			               set: function (v) {
			                   this._attr('_score', v);
			               },
			               get: function () {
			                   return this._score;
			               },
			               configurable: true,
			               enumerable: true
			           },
			           _score: {enumerable:false}
				   },
				   
					_defineRabbitProperties: function () {
				        for (var prop in this._Rabbit_property_definitions){
				            Object.defineProperty(this, prop, this._Rabbit_property_definitions[prop]);
				        }
				    },
					
		  			init: function() {
		  				this.requires('2D, Keyboard,Controls, Color');
		  				Crafty.log("Initializing Carrots: "+this.getId());
						
		  				Crafty.log("Initializing Carrots: score"+this._score);
						
		  				var tiles = Crafty("Tile").get();
		  				
		  				z = 10;

						this._defineRabbitProperties();
						
		  				
						
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
		  		  					//this.x = this._x + Math.cos(Crafty.math.degToRad(this._rotation) )* tileWidth *2;
		  							//this.y = this._y+ Math.sin(Crafty.math.degToRad(this._rotation) ) * tileWidth *2;
		  							var d = new Date();
		  							var delta = d.getTime() - this._startPower;
		               			 	var powerStep = POWER_RATE_PER_SECOND * delta / 1000.0;
		      						this._power = 1.0+ powerStep;
		  							Crafty.log("PowerStep: "+powerStep);
		  							if (this.tile !== undefined)
										locXY = this.tile.jumpFunction(this);
									var coordinator = Crafty('MoveCoordinator').get(0).move(this);
		  							this._power = 1.0;
		  							this._startPower = -1;
		  							var tiles = Crafty("Tile").get();
		  							for (var tileIdx = 0; tileIdx < tiles.length; tileIdx++)
		  							{
		  								if (tiles[tileIdx].contains(locXY))
		  								{
		  									this.x = locXY.x;
		  									this.y = locXY.y;
											this.tile.entityExits(this);
											
		  									this.tile = tiles[tileIdx];
											this.tile.entityEnters(this);
		  									break;
		  								}
		  							}
		  		  				}
		  		  			}
		  				);
		  				this.bind("EnterFrame", function(eventData) {
			  				var locXY = {x:this._x,y:this._y};
			  				for (var tileIdx = 0; tileIdx < tiles.length; tileIdx++)
			  				{

			  					if (tiles[tileIdx].contains(locXY))
			  					{
			  						this.tile = tiles[tileIdx];
									Crafty.log("StartTile is "+this.tile);
			  						break;
			  					}
			  				}
		  					if (this._startPower != -1)
			  				{
			  					var d = new Date();

			  					var delta = d.getTime() - this._startPower;
			  					var powerStep = POWER_RATE_PER_SECOND * delta / 1000.0;
			  					this._power =  1.0 + powerStep;
			  					Crafty.log("Frame PowerStep: "+this.power);
				  				
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
					
		  			
					
				   
		  		});

		  		Crafty.c("Target", {
		  			init: function() {
		  				this.requires('2D,  Color');
		  				Crafty.log("Initializing Target");

		  			}
		  		});
				
				
		  		//Make a sprite
		  		var rabbitTarget = Crafty.e('2D, DOM, Color, Target, TargetImage')
		  		.color("Pink")
		               .attr({x: worldStartX+ (tileX+2)*tileWidth, y: worldStartY+ tileY*tileHeight, z:10,w: tileWidth, h: tileHeight})

		  		 //Now need to add rabbitTarget to the rabit
		  		var rabbit =  Crafty.e('2D, DOM, Color, Keyboard,Controls,Rabbit,Carrots')
		  	    .origin("center")
		  	    .attr({x: worldStartX+ tileX*tileWidth, y: worldStartY+ tileY*tileHeight, z:10, w: tileWidth, h: tileHeight})
		  	    .color("Pink")
		  		.target(rabbitTarget)
		  	    ;

				Crafty.log("rabbit: "+rabbit.getId());
				Crafty.log("Robbit score: "+rabbit.score);
				
			



		  function selectATileColor()
		   {
		  	 colorIdx++;
		  	 colorIdx = colorIdx % colors.length;
		  		return colors[colorIdx]
		    }
        });
