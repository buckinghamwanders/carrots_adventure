import PatternTileEntry from './PatternTileEntry.js';
import PatternTile from './PatternTile.js';

export default class PatternLibrary {

	constructor(patterns)
	{
		this._patterns = patterns;
		this._name = name;
	}

	Patterns() 
	{
		return this._patterns;
	}

	PatternNames()
	{
		return this._patterns.map(function(pattern) {
			return pattern.name();
		})
	}

	FindPattern(idStr)
	{
		return this._patterns.find(function(pattern) {
			return idStr.startsWith(pattern.name());
		});
	}

	/*static build()
	{
		return [
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

			//Red and green
			new PatternTile("default.redgreen", [ 	PatternTile.e(0,0,"redTile"),
									PatternTile.e(0,1,"greenTile"),
									PatternTile.e(1,0,"redTile"),
									PatternTile.e(1,1,"greenTile")])


		]
	}*/
}