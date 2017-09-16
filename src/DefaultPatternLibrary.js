import PatternTileEntry from './PatternTileEntry.js';
import PatternTile from './PatternTile.js';

export default class DefaultPatternLibrary {
	static build()
	{
		return [
		//Pink and blue
			new PatternTile([ 	PatternTile.e(0,0,"pinkTile"),
									PatternTile.e(0,1,"blueTile"),
									PatternTile.e(1,0,"blueTile"),
									PatternTile.e(1,1,"pinkTile")]),

			//Red and green
			new PatternTile([ 	PatternTile.e(0,0,"greenTile"),
									PatternTile.e(0,1,"redTile"),
									PatternTile.e(1,0,"redTile"),
									PatternTile.e(1,1,"greenTile")]),

			//Snakey
			new PatternTile([ 	PatternTile.e(0,0,"greenTile"),
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

			//Red and green
			new PatternTile([ 	PatternTile.e(0,0,"redTile"),
									PatternTile.e(0,1,"greenTile"),
									PatternTile.e(1,0,"redTile"),
									PatternTile.e(1,1,"greenTile")])


		]
	}
}