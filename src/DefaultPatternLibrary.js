import PatternTileEntry from './PatternTileEntry.js';
import PatternTile from './PatternTile.js';

export default class DefaultPatternLibrary {
	static build()
	{
		return [
			new PatternTile([ 	PatternTile.e(0,0,"pinkTile"),
									PatternTile.e(0,1,"blueTile"),
									PatternTile.e(1,0,"blueTile"),
									PatternTile.e(1,1,"pinkTile")]),
			new PatternTile([ 	PatternTile.e(0,0,"greenTile"),
									PatternTile.e(0,1,"redTile"),
									PatternTile.e(1,0,"redTile"),
									PatternTile.e(1,1,"greenTile")]),


		]
	}
}