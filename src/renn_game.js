	//import "babel-polyfill";
	import MoveCountdownEtry from './MoveCountdownEtry.js';
	import CountdownMover from './CountdownMover.js';
	import MoveLibrary from './MoveLibrary.js';
	import IdString from './IdString.js';
	import TargetType from './TargetType.js';
		
		window.onload =(function() {
			
			var screenWidth = 1000;
			var screenHeight = 800;
			var textBuffer = 50;
			
		    var POWER_RATE_PER_SECOND = 1;

		    var numTileWidth = 20;
		    var numTileHeight = 14;
			var worldStartX = 0;
			var worldStartY = textBuffer;
			var worldWidth = screenWidth;
			var worldHeight = screenHeight - textBuffer;
		    var tileWidth = worldWidth/numTileWidth;
		    var tileHeight = worldHeight/numTileHeight;
		    var tileX = 0;
		    var tileY = 3;
		    var colorIdx = 0;
			const CENTER_TIME = 500;
			var standardMoveLibrary = new MoveLibrary();
			standardMoveLibrary = MoveLibrary.installDefaultRules(standardMoveLibrary);
			/*var moveRuleLibrary = {
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
				},
				
				slideRule: {
					name: "Slide",
					slideCounter: {},
					slideSize: 5,
					move:function(mover) {
						var jump = 1;
						return {x: Math.cos(Crafty.math.degToRad(mover._rotation) )* tileWidth *jump, y: Math.sin(Crafty.math.degToRad(mover._rotation) ) * tileWidth *jump};
					},
					
					//return false if done
					//return true to return
					processMoved:function(mover) {
						var id = this.calculateIdString(mover)
						this.updateSlideCount(id);
						var slideLeft = this.slideLength(id)
						
						var ret = slideLeft > 0;
						return ret;
					},
					calculateIdString: function(mover) {return mover.getId();},
					updateSlideCount: function(id) {
						if ((! this.slideCounter.hasOwnProperty (id)) || (this.slideCounter[id] <= 0))
					 	{
							this.slideCounter[id] = this.slideSize;
						}
						this.slideCounter[id] = this.slideCounter[id]--;
					},
					slideLength: function(id) {
						return this.slideCounter[id];
					}
					
				},
			};*/
			
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
				},
				victory : {
					apply:function(mover) {
						Crafty.log("Victory");
						Crafty.trigger("Victory");
					}
				},
				
				quickTime : function(delay)
				 {
					 return {
						 apply:function(mover) {
							 Crafty.log("Trying to quickTime jump");
							 Crafty.e("MoveCoordinator").startMoveClock(mover,delay);
						 }
					 }
				}
			};
			
			var tileMaker = {
				pinkTile:  {
					build: function(tile)
					{
						var color = "#FFAAAA";
		       			tile._enterActions = [tileActions.forceBounce];
						tile.enterRule = [standardMoveLibrary.rules["Power2"]];
		                tile.CircleColor(color);
		                tile.setScore(1);
		               ;
					},
					weight: function()
					{
						return 1.0;
					}
				}
				,
				yellowTile: 
				{
					build:function(tile)
					{
						var color = "#AAOCCE";
		       			tile._enterActions =[tileActions.quickTime(5000)];
						tile.enterRule = [standardMoveLibrary.rules["Default"]];
		                tile.CircleColor(color);
		                tile.setScore(5);
		               ;
					},
					weight: function()
					{
						return 1.0;
					}
				},
				greenTile: 
				{ 
					build:function(tile)
					{
						var color = "#00FF00";
		       			tile._enterActions = [tileActions.forceBounce];
						tile.enterRule = [standardMoveLibrary.rules["Slide"]] ;
		                tile.CircleColor(color)
		               ;
		               tile.setScore(3);
					},
					weight: function()
					{
						return 1.0;
					}
				},

				blueTile: 
				{
					build:function(tile)
					{
						var color = "#AAAAFF";
		       			tile._enterActions = [tileActions.quickTime(500)];
						tile.enterRule = [standardMoveLibrary.rules["Default"]];
		                tile.CircleColor(color)
		               ;
		               tile.setScore(10);
					},
					weight: function()
					{
						return 1.0;
					}
				},
				redTile: {
					build: function(tile)
					{
						var color = "#FF0000";
		       			tile._enterActions = [tileActions.quickTime(3000)];
						tile.enterRule = [standardMoveLibrary.rules["Default"]];
		                tile.CircleColor(color)
		               ;
		               tile.setScore(8);
					},
					weight: function()
					{
						return 1.0;
					}
				},
				deathTile:  {
					build:function(tile)
					{
						var color = "#FFFFFF";
		       			tile._enterActions = [tileActions.death];
						tile.enterRule = [standardMoveLibrary.rules["Default"]];
		                tile.CircleColor(color)
		               ;
		               tile.setScore(-50);
					},
					weight: function()
					{
						return 1.0;
					}
				},
				victoryTile: 
				{ 
					build:function(tile)
					{
						var color = "#e6f700";
		       			tile._enterActions = [tileActions.victory];
						tile.enterRule = [standardMoveLibrary.rules["Default"]];
		                tile.CircleColor(color)
		               ;
		               tile.setScore(50);
					},
					weight: function()
					{
						return 0.01;
					}
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
						var totalWeight = Object.values(tileMaker).map(function(t) { return t.weight();}).reduce(function(w,t) {return w+t;},0);
						var indexWeight = Math.random() * totalWeight;
						var index = (Math.floor(changeFunctions.length * Math.random())) % changeFunctions.length;
						for (var i = 0; i < changeFunctions.length;i++)
						{
							indexWeight -= tileMaker[changeFunctions[i]].weight();
							if (indexWeight <= 0)
							{
								index = i;
								break;
							}
						}
						var cFunc = tileMaker[changeFunctions[index]].build;
						cFunc(tiles[tileIdx]);
						//Crafty.log("Reseting Tile to "+tiles[tileIdx].x+" , "+tiles[tileIdx].y);
					}
				}
				
			}
			
		
			
			var moveTrigger = {
				moverTable: {},
				
				moveComplete : function(mover)
				{
					
				},
				
				moveStarted : function(mover)
				{
					
				},
				
				movePaused : function(mover)
				{
					
				},
				
				tick : function()
				{
					
				},
				
				addMover : function(mover)
				{
					
				},
				
				removeMover : function(mover)
				{
					
				},
				
				updateMoveTime : function(mover)
				{},
				
				
				calculateIdString: function(mover) {return mover.getId();}
				
				
			}
			
			var stageManager = {
				reset : function () {
					var offset = {
						x:Crafty.viewport.x,
						y:Crafty.viewport.y
					}
					
					//Crafty.log("Stage Offset x:"+offset.x+" y: "+offset.y);
					//Crafty.log("Stage Rect x:"+Crafty.viewport.bounds.min.x+" y: "+Crafty.viewport.bounds.min.y);
					
					var elements = Crafty("WorldElement").get();
					var removers = [];
					for (var elIdx = 0; elIdx < elements.length; elIdx++)
					{
						var el = elements[elIdx];
						//Crafty.log("Stage Offset Carrots :"+el.x+" y: "+el.y+" viewPort.x "+Crafty.viewport.x);
						if (el._x  + Crafty.viewport._x < 0)
						{
							Crafty.log("  Remove Offset Carrots :"+el.x+" y: "+el.y);
							
							removers.push(el);
						}
						{
							el.x = el.x +offset.x;
							//el.y = el.y + offset.y;
							//Crafty.log(" Update Offset Carrots :"+el.x+" y: "+el.y);
						}
					}
					factory.reset(removers,worldWidth);
				}
			}
			
		    	Crafty.init(screenWidth,screenHeight);

		    	Crafty.sprite(50, "images/carrots.png", {
		    		Carrots: [0,0]
		    	});
		    	Crafty.sprite(50, "images/target.png", {
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
				Crafty.c('MoveCoordinator', {
					activeMoves : {},
					activeCountdowns : {},
					
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
						var centerXY = mover.centerPosition();
						if ( this.activeMoves.hasOwnProperty (id))
					 	{
							return this.activeMoves[id].reduce((accum,rule,idx,arr)=>this.addMoves(accum,rule.move(mover)),{x:centerXY.x,y:centerXY.y});		
						}
						return {x:centerXY.x,y:centerXY.y};
					},
					
					startMoveClock:function(mover,delay) {
						var id = this.calculateIdString(mover)
						this.activeCountdowns[id] = new CountdownMover(mover);
						mover.delay(this.activeCountdowns[id].doMove,delay,1);
					},
					
					endMoveClock: function(mover, delay) {
						var id = this.calculateIdString(mover)
						if (this.activeCountdowns.hasOwnProperty(id))
							mover.cancelDelay(this.activeCountdowns[id].doMove);
					},
					
					/*executeClockMove: function(mover)
					{
						Crafty.log("Execute a move");
						mover.trigger("CarrotBounce");
					},*/
					
					
					moveCompleted:function(mover) {
						this.endMoveClock(mover);
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

				Crafty.c("Circle", {
				    Circle: function(radius, color) {
				        this.radius = radius;
				        this.w = this.h = radius * 2;
				        this.color = color || "#000000";
        				this.bind("Draw", this.sdraw); 
				        return this;
				    },
				    CircleColor: function( color) {
				        this.color = color || "#000000";
        				return this;
				    },
    
				    sdraw: function( drawVars) {
				       //ctx.save();
				       drawVars.ctx.fillStyle = this.color;
				       drawVars.ctx.beginPath();
				       drawVars.ctx.arc(
				           drawVars.pos._x + drawVars.pos._w/2,
				           drawVars.pos._y + drawVars.pos._h/2,
				           drawVars.pos._w/2,
				           0,
				           Math.PI * 2
				       );
				       drawVars.ctx.closePath();
				       drawVars.ctx.fill();
				    }
				});

		  		Crafty.c("Tile", {
					enterRule: [],
					exitRule: [],
			    	_enterActions: [],
					_exitActions: [],
					_score: 0,
					_idStr: new IdString(0),
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
					//	this.bind("Draw", this.sdraw);  //Does it need to keep rendering with expensive call?

		  			},
					
					   
					    sdraw: function(e) {
					        var ctx=Crafty.canvasLayer.context; 
					        ctx.lineWidth = 8;
					        ctx.strokeStyle = "0x00FF00"
							ctx.beginPath();
							ctx.arc(e.pos._x,e.pos._y,e.width,0,2*Math.PI)
					        //ctx.moveTo(e.pos._x, e.pos._y+20);
					        //ctx.lineTo(e.pos._x+50, e.pos._y+20);
					        ctx.stroke();
					     },
					
					entityEnters: function (obj) {
						Crafty.log("EnterTile: "+this._x+","+this._y+" obj: "+obj+" enterAction "+this._enterActions.length+" color "+this._color);
						this.enterRule.forEach(function(r) {
								Crafty('MoveCoordinator').get(0).registerMoveRule(obj,r);
								
							}
						);
						obj.applyScore(this.getScore());
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
					},

					setScore: function(s)
					{
						this._score = s;
					},	

					getScore: function()
					{
						return this._score;
					},

					setIdStr: function(s)
					{
						this._idStr = s;
					},

					getIdStr: function(s)
					{
						return this._idStr;
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

		    var colors = ["#FFFF00", "#FF0000", "#FFFF00", "#00FF00", "#FFFF00", "#0000FF"];
		    for (var x = 0; x < numTileWidth; x++)
		   	{
		    	 for (var y = 0; y < numTileHeight; y++)
		  		 {
					 var color = selectATileColor();
					 var enterAction = null;
					 if (color == "#FF0000")
					 {
						 enterAction = tileActions.forceBounce;
    		       			 Crafty.e('2D, DOM, Color, Tile, WorldElement, Canvas, Circle').Circle(tileWidth,color)
    		               .attr({x: worldStartX+ x*tileWidth, y:worldStartY+ y*tileHeight, z:1,w: tileWidth, h: tileHeight,enterRule:[],_enterActions:[]})
    		              // .color(color)
						 	.origin("center")
    		               ;
					 }
					 else {
  		       			 Crafty.e('2D, DOM, Color, Tile, WorldElement, Canvas, Circle').Circle(tileWidth,color)
  		               .attr({x: worldStartX+ x*tileWidth, y:worldStartY+ y*tileHeight, z:1,w: tileWidth, h: tileHeight,enterRule:[]})
  		               //.color(color)
  		               ;
					 }	
		  		}
		    }

			

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
									
									//this.tile = tiles[tileIdx];
									//this.tile.entityEnters(this);
									this.one("TweenEnd",function(){
										this.bouncing = false;
	  									Crafty.log("Got tween end.");
										tileManager.update();
										stageManager.reset();
										var newTile = findTile({x:this._x,y:this._y});
										this.tile = newTile;
										this.tile.entityEnters(this);
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
							newTile.entityEnters(this);
					},

					applyScore: function(s)
					{
						this._score = this._score + s;
					},

					tileMoveWidth : function ()
					{
						return tileWidth;
					}
		  		});

		  		/*Crafty.c("Target", {
		  			init: function() {
		  				this.requires('2D,  Color');
		  				Crafty.log("Initializing Target");

		  			}
		  		});*/
		  		TargetType.toCrafty();
				
				
				Crafty.c("GameManager", {
		  			init: function() {
		  				this.bind("ResetWorld", function() {
		  					factory.reset(Crafty("Tile").get(),0);
							Crafty("Rabbit").each(function(r) {
								var x = worldStartX+ tileX*tileWidth;
								var y = worldStartY+ tileY*tileHeight;
								var t = findFirstTile(function(t) {return t._x});
								this.forceLocation(t._x,t._y);
							});
							
		  				});

		  				this.bind("Victory", function() {
		  					factory.reset(Crafty("Tile").get(),0);
							Crafty("Rabbit").each(function(r) {
								var x = worldStartX+ tileX*tileWidth;
								var y = worldStartY+ tileY*tileHeight;
								var t = findFirstTile(function(t) {return t._x});
								this.forceLocation(t._x,t._y);
							});
							
		  				});
		  			}
				});
				
				
		  		//Make a sprite
		  		var rabbitTarget = Crafty.e('2D, DOM, Color, Target, TargetImage, WorldElement')
		  		//.color("Pink")
		               .attr({x: worldStartX+ (tileX+2)*tileWidth, y: worldStartY+ tileY*tileHeight, z:10,w: 50, h: 46})

		  		 //Now need to add rabbitTarget to the rabit
		  		var rabbit =  Crafty.e('2D, DOM, Color, Keyboard,Controls,Rabbit,Carrots,Tween,WorldElement,Delay')
		  	    .origin("center")
		  	    .attr({x: worldStartX+ tileX*tileWidth, y: worldStartY+ tileY*tileHeight, z:10, w: 50, h: 46,score:0,power:0, startPower:-1})
		  	    //.color("Pink")
		  		.target(rabbitTarget)
		  	    ;
				
				var gameManager = Crafty.e('GameManager');
				Crafty.trigger("ResetWorld");
				Crafty.viewport.bounds = {min:{x:0, y:0}, max:{x:500, y:500}};
				
				Crafty.viewport.clampToEntities = false;
				//Crafty.one("CameraAnimationDone", function() {
				 //   Crafty.viewport.follow(rabbit, 0, 0);
				//});
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
				var found = 0;
  				for (var tileIdx = 0; tileIdx < tiles.length; tileIdx++)
  				{

  					if (tiles[tileIdx].contains(locXY))
  					{
						ret = tiles[tileIdx];
						found = found +1;
						//break;
  					}
  				}
				Crafty.log("Found Tiles: "+found);
				return ret;
			}
			
			function findFirstTile(tFunc)
			{
  				var tiles = Crafty("Tile").get();
  				var ret;
				var found = 0;
				var minVal;
  				for (var tileIdx = 0; tileIdx < tiles.length; tileIdx++)
  				{

  					if (minVal == undefined || tFunc(tiles[tileIdx]) < minVal)
  					{
						ret = tiles[tileIdx];
						minVal = tFunc(tiles[tileIdx]);
						found = found +1;
						//break;
  					}
  				}
				Crafty.log("Found First Tiles: "+found);
				return ret;
			}
			
        });
