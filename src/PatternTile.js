import PatternTileEntry from './PatternTileEntry.js';

export default class PatternTile {
	constructor(name,patternEntries)
	{
		this._patternEntries = patternEntries;
		this._name = name;
	}

	buildPattern(loc)
	{
		let ret = [];
		
		this._patternEntries.forEach((e)=> {
			ret.push(e.build(this._name,loc));
		});
		return ret;
		
	}

	entry(idx)
	{
		return this._patternEntries[idx];
	}

	name()
	{
		return this._name;
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

