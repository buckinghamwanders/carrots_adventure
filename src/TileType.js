import IdString from './IdString.js';
	
export default class TileType {
	static toCrafty()
	{
		var numTileWidth = 20;
		var numTileHeight = 14;
			
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
						this._enterActions.forEach((r) => {
							r.apply(obj,this);
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

		 
	}
}