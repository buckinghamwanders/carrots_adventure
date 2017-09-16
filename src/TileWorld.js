import TileEntity from './TileEntity.js';
import LocationRegistry from './LocationRegistry.js';
	
export default class TileWorld {
	constructor(tileWidth,tileHeight,numColumn, numRows)
	{
		this.tileWidth = tileWidth;
		this.tileHeight = tileHeight;
		this.numRows = numRows;
		this.numColumns = numColumn;

		this.locRegistry = new LocationRegistry(this.numColumns,this.numRows);
	}

	clear()
	{
		this.locRegistry.Reset();
	}

	screenXYToGrid(loc)
	{
		return {x:Math.floor(loc.x/this.tileWidth),y:Math.floor(loc.y/this.tileHeight)};
	}

	gridToScreenXY(loc)
	{
		return { x: loc.x * this.tileWidth, y: loc.y * this.tileHeight}; //this is in wrapped space.
	}

	Registry()
	{
		return this.locRegistry;
	}

	screenWidthToGridWidth(width)
	{
		return Math.floor(width/this.tileWidth);
	}

	registerTile(entity)
	{
		var tile = new TileEntity(entity);

	}

	isAvailable(location)
	{
		var ret = false;
		return ret;
	}

	findEndPoints()
	{
		var ends = [];
		return ends;
	}
}