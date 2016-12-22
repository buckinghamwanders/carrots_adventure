		screenWidth = 500;
		screenHeight = 350;
	
      	Crafty.init(screenWidth,screenHeight, document.getElementById('game'));
	  
	  	Crafty.sprite(64, "images/carrots.png", {
	  		Carrots: [0,0]
	  	});
	 	Crafty.c("Rabbit", {
	  			init: function() {
					this.requires('2D, Keyboard,Controls, Color');
					Crafty.log("Initializing Carrots");
		  			
	  				z = 10;
					this.power = 1.0;
					
			        this.bind("KeyDown", function(e) {
			  				//on keydown, set the move booleans
						Crafty.log("Got key down: e");
			  				if(e.keyCode === Crafty.keys.RIGHT_ARROW) {
			  					this.rotation = this._rotation+90;
			  				} else if(e.keyCode === Crafty.keys.LEFT_ARROW) {
			  					this.rotation = this._rotation - 90;
				
			  				} else if(e.keyCode === Crafty.keys.SPACE) {
			  					//this.x = this._x + Math.cos(Crafty.math.degToRad(this._rotation) )* tileWidth *2;
								//this.y = this._y+ Math.sin(Crafty.math.degToRad(this._rotation) ) * tileWidth *2;
								/*locXY = this.tile.jumpFunction(this);
								var tiles = Crafty("Tile").get();
								for (int tileIdx = 0; tileIdx < tiles.length; tileIdx++)
								{
									if (tiles[i].contains(locXY))
									{
										this.x = locXY.x;
										this.y = locXY.y;
								
									}									
								}	*/
								this.power += 0.1;	
								Crafty.log("Power - "+power);						
			  				}
			  			}
				        this.bind("KeyUp", function(e) {
				  				//on keydown, set the move booleans
							Crafty.log("Got key up: e");
				  				 if(e.keyCode === Crafty.keys.SPACE) {
				  					//this.x = this._x + Math.cos(Crafty.math.degToRad(this._rotation) )* tileWidth *2;
									//this.y = this._y+ Math.sin(Crafty.math.degToRad(this._rotation) ) * tileWidth *2;
									locXY = this.tile.jumpFunction(this);
									var tiles = Crafty("Tile").get();
									for (int tileIdx = 0; tileIdx < tiles.length; tileIdx++)
									{
										if (tiles[i].contains(locXY))
										{
											this.x = locXY.x;
											this.y = locXY.y;
								
										}									
									}	
									power = 1.0;							
				  				}
				  			});
	  			}
	  		});
			Crafty.c("Tile", {
				init: function() {
					this.jumpSize = 2;
					this.jumpFunction = function(e) {
						var jump = Math.floor(this.jumpSize * e.power);
						return {x:e._x + Math.cos(Crafty.math.degToRad(e._rotation) )* tileWidth *jump, y:e._y+ Math.sin(Crafty.math.degToRad(e._rotation) ) * tileWidth *jump};
					}
					
					this.contains(l) {
						return (l.x >= this._x && l.x < this._x + this._w) && 
									 (l.y >= this._y && l.y < this._h + this._y)
					}
					
				}
			}
	 	
	  numTileWidth = 10;
	  numTileHeight = 7;
	  tileWidth = screenWidth/numTileWidth;
	  tileHeight = screenHeight/numTileHeight;
	  tileX = 0;
	  tileY = 3;
      var colors = ["FFFF00", "FF0000", "FFFF00", "00FF00", "FFFF00", "0000FF"];
	  colorIdx = 0;
		Crafty.e('2D, DOM, Color, Keyboard,Controls,Rabbit,Carrots')
	  .origin("center")
	  .attr({x: tileX*tileWidth, y: tileY*tileHeight, z:10, w: tileWidth, h: tileHeight})
	  .color("Pink")
      ;
	  for (x = 0; x < numTileWidth; x++)
  	 	{
	  		for (y = 0; y < numTileHeight; y++)
			 {
         		Crafty.e('2D, DOM, Color, Tile')
                 .attr({x: x*tileWidth, y: y*tileHeight, z:1,w: tileWidth, h: tileHeight})
                 .color(selectATileColor())
                 ;
			}
			
	  }
	  
    
	function selectATileColor()
	 {
		 colorIdx++;
		 colorIdx = colorIdx % colors.length;
			return colors[colorIdx]
	  }
	  
