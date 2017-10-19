	//import "babel-polyfill";
	import MoveCountdownEtry from './MoveCountdownEtry.js';
	import CountdownMover from './CountdownMover.js';
	import MoveLibrary from './MoveLibrary.js';
	import IdString from './IdString.js';
	import TargetType from './TargetType.js';
	import TileType from './TileType.js';
	import CircleType from './CircleType.js';
	import TileFactory from './TileFactory.js';
	import TileWorld from './TileWorld.js';
	import LocationRegistry from './LocationRegistry.js';
	import RandomTileSelector from './RandomTileSelector.js';
	import TileLibrary from './TileLibrary.js';
	import SimpleTileFactory from './SimpleTileFactory.js';
	import DefaultTileLibrary from './DefaultTileLibrary.js';
	import TileArranger from './TileArranger.js';
	import PatternTileSelector from './PatternTileSelector.js';
	import RotationSelector from './RotationSelector.js';
	import StageManager from './StageManager.js';
	import DefaultPatternLibrary from './DefaultPatternLibrary.js';
	import PatternLibrary from './PatternLibrary.js';
	import TileActionLibrary from './TileActionLibrary.js';
	import WorldElementType from './WorldElementType.js';
	import {transitions, TransitionTable} from './TransitionTable.js';
	import {stageManager, CarrotGame} from './CarrotGame.js';
	import RabbitType from './RabbitType.js';
	import MoverUpdaterType from './MoverUpdaterType.js';
	import MoverSurfaceType from './MoverSurfaceType.js';

		window.onload =(function() {
			
			var screenWidth = 1000;
			var screenHeight = 800;
			var textBuffer = 50;
			
		    
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
			var standardMoveLibrary = new MoveLibrary();
			var tileWorld = new TileWorld(tileWidth,tileHeight,numTileWidth,numTileHeight);

			var rabbitId = -1;

			standardMoveLibrary = MoveLibrary.installDefaultRules(standardMoveLibrary);

			var table = document.getElementById("usageTable");
			table.innerHTML = "Some Debug Stuff Really";
        	
        	var transTable = document.getElementById("transitionTable");
			transTable.innerHTML = "Some Debug Stuff Really";
        	
        	var rabbitPower = document.getElementById("hud.power");
        	var rabbitScore = document.getElementById("hud.score");
        	var rabbitBouncing = document.getElementById("bounce.state");

			var tileActions =  new TileActionLibrary();
			
			let patternLibrary = DefaultPatternLibrary.build();
			CarrotGame.setTileWidth(tileWidth);
			CarrotGame.setTileHeight(tileHeight);
			CarrotGame.setTable(table);
			CarrotGame.setPatternLibrary(patternLibrary);

			var highAndRightTest = function(offset)
			{
				return {
					theGlobalOffset : Math.floor(offset/tileWidth),

					isBetter : function (gridLocXY1, gridLocXY2, aLocRegistry)
					{
						var globalXY1 = aLocRegistry.calculateAGlobalSpot(gridLocXY1,this.theGlobalOffset);

						var globalXY2 = aLocRegistry.calculateAGlobalSpot(gridLocXY2,this.theGlobalOffset);
						if (globalXY1.x < globalXY2.x)
							return true;
						if (globalXY1.x > globalXY2.x)
							return false;
						if (globalXY1.y < globalXY2.y)
							return true;
						return false;

					}
				}
			}

			var newFactory = new SimpleTileFactory(new TileArranger(DefaultTileLibrary.build(tileActions,standardMoveLibrary), new PatternTileSelector(new RotationSelector(patternLibrary.Patterns()))), highAndRightTest,tileWorld);

			let sManager = new StageManager(tileWorld,newFactory,{width:worldWidth,height:worldHeight});
			CarrotGame.setStageManager(sManager);

			
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
				
				WorldElementType.toCrafty();

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
						Crafty.log("MC.Register Moves: Register "+this.activeMoves[id].map((r)=>r.name).join());
					},
					
					unregisterMoveRule: function(mover,rule) {
						var id = this.calculateIdString(mover)
						if ( this.activeMoves.hasOwnProperty (id))
					 	{
							var pos = this.activeMoves[id].indexOf(rule);
							if (pos != -1)
								this.activeMoves[id].splice(pos,1);
							Crafty.log("MC.Registered Moves: Unregister "+this.activeMoves[id].map((r)=>r.name).join());
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
							Crafty.log("MC.MoveComplete: Registered Moves "+this.activeMoves[id].map((r)=>r.name).join());
						
							return this.activeMoves[id] = this.activeMoves[id].filter((rule)=>rule.processMoved(mover));		
						
						}
						return {x:0,y:0};
					},
					
					addMoves:function(move1,move2) {
						return {x:move1.x+move2.x,y:move2.y+move1.y};
					},
					
					reset: function ()
					 {
					 		this.activeMoves = {};
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
					{

						this.text('No rabbit');
						table.innerHTML = "No Rabbit";
					}
					else if (aRabbit.score === undefined)
					{

						this.text('No score');
						table.innerHTML = "No score";
					}
					else{
						this.text (aRabbit._score.toString());
						//table.innerHTML = "Score: "+aRabbit._score.toString();
					}
					rabbitPower.innerHTML="Power: "+aRabbit._power.toString();
					rabbitScore.innerHTML="Score: "+aRabbit._score.toString();
					rabbitBouncing.innerHTML="Bounce: "+aRabbit.bouncing.toString();

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

		

				CircleType.toCrafty();
		  		TileType.toCrafty();
		  		MoverSurfaceType.toCrafty();
		  		MoverUpdaterType.toCrafty();
				
				
				
		 
		    var colors = ["#FFFF00", "#FF0000", "#FFFF00", "#00FF00", "#FFFF00", "#0000FF"];
		    for (var x = 0; x < numTileWidth; x++)
		   	{
		    	 for (var y = 0; y < numTileHeight; y++)
		  		 {
					 var color = selectATileColor();
					 var enterAction = null;
					 if (color == "#FF0000")
					 {
						 enterAction = tileActions.forceBounce();
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

	
		  		RabbitType.toCrafty();
		  		TargetType.toCrafty();
				
				
				Crafty.c("GameManager", {
		  			init: function() {
		  				this.bind("ResetWorld", function() {
		  					var elements = Crafty("Tile").get();
							for (var elIdx = 0; elIdx < elements.length; elIdx++)
							{
								var el = elements[elIdx];
						
								tileWorld.Registry().Release(tileWorld.screenXYToGrid({x:el._x,y:el._y}));
							}
							tileWorld.Registry().Reset();
							newFactory.clear();
		  					newFactory.reset(Crafty("Tile").get(),0,0);
		  					CarrotGame.StageManager().clear();

		  					Crafty("MoveCoordinator").each(function() {
		  						this.reset();
		  					});
							Crafty("Rabbit").each(function(r) {
								var x = worldStartX+ tileX*tileWidth;
								var y = worldStartY+ tileY*tileHeight;
								var t = findFirstTile(function(t) {return t._x});
								this.forceLocation(t._x,t._y);
							});
							
		  				});

		  				this.bind("Victory", function() {
		  					var elements = Crafty("Tile").get();
							for (var elIdx = 0; elIdx < elements.length; elIdx++)
							{
								var el = elements[elIdx];
						
								tileWorld.Registry().Release(tileWorld.screenXYToGrid({x:el._x,y:el._y}));
							}
		  					newFactory.reset(Crafty("Tile").get(),0,0);
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

		  	    /*for (var xLoc = 0; xLoc < Math.ceil(screenWidth/tileWidth); xLoc += 2)
				{
					for (var yLoc = 0; yLoc < Math.ceil(screenHeight/tileHeight); yLoc += 1)
					{
						locRegistry.Claim({x:xLoc,y:yLoc},11);
					}
				}*/
				
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
				rabbitId = rabbit.getId();
				

			
		  function selectATileColor()
		   {
		  	 colorIdx++;
		  	 colorIdx = colorIdx % colors.length;
		  		return colors[colorIdx]
		    }
			
			/*function findTile(locXY)
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
			}*/
			
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
