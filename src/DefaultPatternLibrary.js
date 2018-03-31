import PatternTileEntry from './PatternTileEntry.js';
import PatternTile from './PatternTile.js';
import PatternLibrary from './PatternLibrary.js';

export default class DefaultPatternLibrary {
	static build()
	{
		return new PatternLibrary([
		//Pink and blue
			new PatternTile("default.bluepink",[ 	PatternTile.e(0,0,"pinkTile"),
									PatternTile.e(0,1,"blueTile"),
									PatternTile.e(1,0,"blueTile"),
									PatternTile.e(1,1,"pinkTile")]),

			//Red and green
			new PatternTile("default.greenred",[ 	PatternTile.e(0,0,"greenTile"),
									PatternTile.e(0,1,"redTile"),
									PatternTile.e(1,0,"redTile"),
									PatternTile.e(1,1,"greenTile")]),

			//Snakey
			new PatternTile("default.greenskinny",[ 	PatternTile.e(0,0,"greenTile"),
									PatternTile.e(1,0,"greenTile"),
									PatternTile.e(2,0,"greenTile"),
									PatternTile.e(3,0,"deathTile"),
									PatternTile.e(4,0,"deathTile"),
									PatternTile.e(0,1,"deathTile"),
									PatternTile.e(1,1,"deathTile"),
									PatternTile.e(2,1,"greenTile"),
									PatternTile.e(3,1,"greenTile"),
									PatternTile.e(4,1,"greenTile")

									]),

			//Yellow and green
			new PatternTile("default.yellowgreen", [ 	PatternTile.e(0,0,"yellowTile"),
									PatternTile.e(0,1,"greenTile"),
									PatternTile.e(1,0,"yellowTile"),
									PatternTile.e(1,1,"greenTile")]),

			//Red and green
			new PatternTile("default.redgreen", [ 	PatternTile.e(0,0,"yellowTile"),
									PatternTile.e(0,1,"orangeTile"),
									PatternTile.e(0,2,"greenTile"),
									PatternTile.e(1,2,"greenTile"),
									PatternTile.e(1,1,"redTile"),
									PatternTile.e(1,0,"blueTile"),
									PatternTile.e(2,2,"greenTile"),
									PatternTile.e(2,1,"orangeTile")])



		]);
	}
}