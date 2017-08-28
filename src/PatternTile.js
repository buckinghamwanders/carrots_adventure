import PatternTileEntry from './PatternTileEntry.js';

export default class PatternTile {
	constructor(patternEntries)
	{
		this._patternEntries = patternEntries;
	}

	buildPattern(loc)
	{
		let ret = [];
		
		this._patternEntries.forEach((e)=> {
			ret.push(e.build(loc));
		});
		return ret;
		
	}

	entry(idx)
	{
		return this._patternEntries[idx];
	}

	static e(x,y,tile)
	{
		return new PatternTileEntry(x,y,tile);
	}

	static buildDefaultPattern()
	{
		return new PatternTile([ 	PatternTile.e(0,0,"green"),
									PatternTile.e(0,1,"green"),
									PatternTile.e(1,0,"blue"),
									PatternTile.e(1,1,"white")]);
	}
}

