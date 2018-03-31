/**
Default tile library.

**/

import TileLibrary from './TileLibrary.js'
export default class MomentumTileLibrary {

	static build(tileActions,standardMoveLibrary) {
		var library  = new TileLibrary();


	library.addConfiguration("pinkTile",  {
					build: function(sourceStr) {
						return function(tile) //aka slidey
						{
							var color = "#FFAAAA";
			       			//tile._enterActions = [tileActions.forceBounce()];
							tile._enterActions = [tileActions.momentum()];
							tile.enterRule = [standardMoveLibrary.rules["Momentum"]];
							 if ( typeof(tile.CircleColor) != typeof(Function))
							 {
							 	Crafty.log("Missing CircleColor");
							 }
							 tile.intitializeSurface(0.0,0.0,0.0,1);
			                tile.CircleColor(color);
			                tile.setScore(1);
			                tile.setIdStr(sourceStr+"."+"pinkTile");
			               ;
						}
					},
					weight: function()
					{
						return 1.0;
					}
				})
				
				.addConfiguration("yellowTile", 
									{
										build:function(sourceStr) {
											return function(tile)
											{
												var color = "#AAOCCE";
								       			//tile._enterActions =[tileActions.quickTime(5000)];
												tile._enterActions = [tileActions.momentum()];
												tile.enterRule = [standardMoveLibrary.rules["Momentum"]];
								                tile.CircleColor(color);
								                tile.setScore(5);
								                tile.setIdStr(sourceStr+"."+"yellowTile1");
								                tile.intitializeSurface(1.0,1.0,0.0,1);
			                
								               ;
											}
										},
										weight: function()
										{
											return 1.0;
										}
									})
				.addConfiguration("greenTile", //aka bouncy
									{ 
										build:function(sourceStr) {
											return function(tile)
											{
												var color = "#00FF00";
								       			//tile._enterActions = [tileActions.forceBounce()];
												tile._enterActions = [tileActions.momentum()];
												tile.enterRule = [standardMoveLibrary.rules["Momentum"]] ;
								                tile.CircleColor(color)
								               ;
								               tile.intitializeSurface(1.0,1.0,3.0,1);
			                
								               tile.setScore(3);
								               tile.setIdStr(sourceStr+"."+"greenTile");
								           };
										},
										weight: function()
										{
											return 1.0;
										}
									})

				.addConfiguration("blueTile",  //aka tilty
									{
										build:function(sourceStr) {
											return function(tile)
											{
												var color = "#AAAAFF";
								       			//tile._enterActions = [tileActions.quickTime(500)];
												tile._enterActions = [tileActions.momentum()];
												tile.enterRule = [standardMoveLibrary.rules["Momentum"]];
								                tile.CircleColor(color)
								               ;
								               tile.intitializeSurface(0.8,0.8,0,0.01);
			                
								               tile.setScore(10);
								               tile.setIdStr(sourceStr+"."+"blueTile");
								           };
										},
										weight: function()
										{
											return 1.0;
										}
									})
				.addConfiguration("redTile", {
									build: function(sourceStr) {
										return function(tile)
										{
											var color = "#FF0000";
							       			tile._enterActions = [tileActions.momentum()];
											tile.enterRule = [standardMoveLibrary.rules["Momentum"]];
								               //tile._enterActions = [tileActions.death()];
											tile.CircleColor(color)
							               ;
							                tile.intitializeSurface(1.0,1.0,0,1);
			                
							               tile.setScore(8);
							               tile.setIdStr(sourceStr+"."+"redTile");
							           };
									},
									weight: function()
									{
										return 0.4;
									}
									})
				.addConfiguration("orangeTile", {
									build: function(sourceStr) {
										return function(tile)
										{
											var color = "#F26604";
								       			//tile._enterActions = [tileActions.quickTime(500)];
												tile._enterActions = [tileActions.momentum()];
												tile.enterRule = [standardMoveLibrary.rules["Momentum"]];
								                tile.CircleColor(color)
								               ;
								               tile.intitializeSurface(1.0,1.0,0,1);
			                
								               tile.setScore(10);
								               tile.setIdStr(sourceStr+"."+"orangeTile");
							           };
									},
									weight: function()
									{
										return 0.4;
									}
									})
				.addConfiguration("yellowTile", {
									build: function(sourceStr) {
										return function(tile)
										{
											var color = "#f2eb32";
								       			//tile._enterActions = [tileActions.quickTime(500)];
												tile._enterActions = [tileActions.momentum(),tileActions.carrotColor()];
												tile.enterRule = [standardMoveLibrary.rules["Momentum"]];
								                tile.CircleColor(color)
								               ;
								                tile.intitializeSurface(1.0,1.0,0,1);
			                
								               tile.setScore(10);
								               tile.setIdStr(sourceStr+"."+"yellowTile2");
							           };
									},
									weight: function()
									{
										return 0.4;
									}
									})
				.addConfiguration("deathTile",  {
												build:function(sourceStr) {
													return function(tile)
													{
														var color = "#FFFFFF";
										       			tile._enterActions = [tileActions.death()];
														tile.enterRule = [];
										                tile.CircleColor(color)
										               ;
										                tile.intitializeSurface(1.0,1.0,0,1);
			                
										               tile.setScore(-50);
										               tile.setIdStr(sourceStr+"."+"death");
										           };
												},
												weight: function()
												{
													return 0.2;
												}
											})
				.addConfiguration("victoryTile", 
				{ 
					build:function(sourceStr) {
						return function(tile)
						{
							var color = "#e6f700";
			       			tile._enterActions = [tileActions.victory()];
							tile.enterRule = [standardMoveLibrary.rules["Momentum"]];
			                tile.CircleColor(color)
			               ;
			               tile.setScore(50);
			               tile.intitializeSurface(1.0,1.0,0,1);
			                
			               tile.setIdStr(sourceStr+"."+"victory");
			           };
					},
					weight: function()
					{
						return 0.01;
					}
				});
				
				
		return library;
			
	}
}