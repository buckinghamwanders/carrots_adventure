/**
Given a location it picks the tile type to place there.
This is the glue code that matches the tile library with the tile selector.


**/
export default class PatternTileSelector {

	constructor()
	{
		this._patternRegistry = {};
	}

	initializeFromLibrary(tileLibrary)
	{
		
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

	configureNewPattern(startLoc)
	{
		this.registerLocation(startLoc.x,startLoc.y,"pinkTile");
		this.registerLocation(startLoc.x+1,startLoc.y+1,"pinkTile");
		this.registerLocation(startLoc.x+1,startLoc.y,"blueTile");
		this.registerLocation(startLoc.x,startLoc.y+1,"blueTile");
	}

	registerLocation(x,y,tileType)
	{
		this._patternRegistry[this.calcXYString(x,y)] = tileType;
	}

}
