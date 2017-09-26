export default class PatternTileEntry {

	constructor(x,y,tile)
	{
		this._x = x;
		this._y = y;
		this._tile = tile;
	}

	
	build(build_source,loc)
	{
		return {
			x: this._x+loc.x,
			y: this._y + loc.y,
			tile: this._tile,
			source:build_source
		}
	}

	X()
	{
		return this._x;
	}

	Y()
	{
		return this._y;
	}

	Tile()
	{
		return this._tile;
	}
}