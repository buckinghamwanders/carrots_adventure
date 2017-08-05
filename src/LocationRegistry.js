export default class LocationRegistry {


	constructor(sizeX,sizeY)
	{
		this._sizeX = sizeX;
		this._sizeY = sizeY;


		this._offsetX = 0;
		this._offsetY = 0;

		this._registry = new Array(sizeX* sizeY);
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
		var locIdx = this.FindLocation(loc);
		console.log("LocationRegistry: "+locIdx+" "+this._registry[locIdx]);
		return !(this._registry[locIdx] === undefined || this._registry[locIdx] === null);
	}

	ClaimData(loc)
	{
		var locIdx = this.FindLocation(loc);
		return this._registry[locIdx];
	}

	FindLocation(loc)
	{
		var ret = ((loc.x + this._offsetX) % this._sizeX) * this._sizeY + ((loc.y + this._offsetY) % this._sizeY);
		console.log("FindLocation: loc.x "+loc.x+" loc.y "+loc.y+" offset X "+this._offsetX+" offset Y "+this._offsetY+" sizeX "+this._sizeX+" sizeY "+this._sizeY+" ret "+ret);
		return ret;
	}

	Shift(delta)
	{
		this._offsetX += delta.x;
		this._offsetY += delta.y;

	}

}