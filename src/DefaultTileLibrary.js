/**
Default tile library.

**/

import TileLibrary from './TileLibrary.js'
export default class DefaultTileLibrary {

	static build(tileActions,standardMoveLibrary) {
		var library  = new TileLibrary();


	library.addConfiguration("pinkTile",  {
					build: function(tile)
					{
						var color = "#FFAAAA";
		       			tile._enterActions = [tileActions.forceBounce()];
						tile.enterRule = [standardMoveLibrary.rules["Power2"]];
						 if ( typeof(tile.CircleColor) != typeof(Function))
						 {
						 	Crafty.log("Missing CircleColor");
						 }
		                tile.CircleColor(color);
		                tile.setScore(1);
		               ;
					},
					weight: function()
					{
						return 1.0;
					}
				})
				
				.addConfiguration("yellowTile", 
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
									})
				.addConfiguration("greenTile", 
									{ 
										build:function(tile)
										{
											var color = "#00FF00";
							       			tile._enterActions = [tileActions.forceBounce()];
											tile.enterRule = [standardMoveLibrary.rules["Slide"]] ;
							                tile.CircleColor(color)
							               ;
							               tile.setScore(3);
										},
										weight: function()
										{
											return 1.0;
										}
									})

				.addConfiguration("blueTile", 
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
									})
				.addConfiguration("redTile", {
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
									})
				.addConfiguration("deathTile",  {
												build:function(tile)
												{
													var color = "#FFFFFF";
									       			tile._enterActions = [tileActions.death()];
													tile.enterRule = [];
									                tile.CircleColor(color)
									               ;
									               tile.setScore(-50);
												},
												weight: function()
												{
													return 1.0;
												}
											})
				.addConfiguration("victoryTile", 
				{ 
					build:function(tile)
					{
						var color = "#e6f700";
		       			tile._enterActions = [tileActions.victory()];
						tile.enterRule = [standardMoveLibrary.rules["Default"]];
		                tile.CircleColor(color)
		               ;
		               tile.setScore(50);
					},
					weight: function()
					{
						return 0.01;
					}
				});
				
				
		return library;
			
	}
}