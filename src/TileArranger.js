import RandomTileSelector from './RandomTileSelector.js';

/**
Given a location it picks the tile type to place there.
This is the glue code that matches the tile library with the tile selector.


**/
export default class TileArranger {

	constructor(tileLibrary,tileSelector)
	{
		this._tileLibrary = tileLibrary;
		this._selector = tileSelector;
		tileSelector.initializeFromLibrary(tileLibrary);
		
		//TODO - update the selector
	}

	clear()
	{
		this._selector.clear();
	}

	installWeight(tName)
	{
		this._selector.addWeight(tName,this._tileLibrary.tile(tName).weight());
	}
	
	buildFunction(gridLocation)
	{
		var label = this._selector.selectLabel(gridLocation);
		return this._tileLibrary.tile(label).build;
	}
}
