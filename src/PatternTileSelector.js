/**
Given a location it picks the tile type to place there.
This is the glue code that matches the tile library with the tile selector.


**/
export default class PatternTileSelector {

	constructor(patternSelector)
	{
		this._patternRegistry = {};
		this._patternSelector = patternSelector;
	}


	clear()
	{

	}
	initializeFromLibrary(tileLibrary)
	{
		this._patternRegistry = {};
		this._patternSelector.clear();
	}

	findLocationTile(loc)
	{
		let propertyString = this.calcLocationString(loc);
		let ret = this._patternRegistry[propertyString];
		delete this._patternRegistry[propertyString];
		return ret;
	}

	calcXYString(x,y)
	{
		return x.toString()+'_'+y.toString();
	}

	calcLocationString(loc)
	{
		return this.calcXYString(loc.x,loc.y);
	}

	preselectedTile(loc)
	{
		return this._patternRegistry.hasOwnProperty(this.calcLocationString(loc));
	}


	selectLabel(loc)
	{
		if (!this.preselectedTile(loc))
		{
			this.configureNewPattern(loc);
		}
		return this.findLocationTile(loc);
	}

	selectPattern(loc)
	{
		return this._patternSelector.select(loc);
	}

	configureNewPattern(startLoc)
	{
		let pattern = this.selectPattern(startLoc);
		let entries = pattern.buildPattern(startLoc);
		entries.forEach(e=> {
			this.registerLocation(e.x,e.y,e.tile);
		});
		
	}

	registerLocation(x,y,tileType)
	{
		this._patternRegistry[this.calcXYString(x,y)] = tileType;
	}

}
