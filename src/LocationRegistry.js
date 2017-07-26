export default class LocationRegistry {


	constructor(sizeX,sizeY)
	{
		this._sizeX = sizeX;
		this._sizeY = sizeY;


		this._offsetX = 0;
		this._offsetY = 0;

		this._registry = new Array[this._sizeX* this._sizeY];
	}

	Claim( loc, marker)
	{
		this._registry[this.FindLocation(loc)] = marker;
	}

	Release (loc, Marker)
	{
		this._registry[this.FindLocation(loc)] = null; //TODO - what should be null  by convention
	}

	IsClaimed(loc)
	{
		return this._registry[this.FindLocation(loc)] === null ;
	}

	FindLocation(loc)
	{
		return ((loc.x + this._offsetX) % this._sizeX) * this._sizeY + ((loc.y + this._offsetY) % this._sizeY);
	}

	Shift(delta)
	{
		this._offsetX += delta.x;
		this._offsetY += delta.y;

	}

}