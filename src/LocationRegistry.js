export default class LocationRegistry {


	constructor(sizeX,sizeY)
	{
		this._sizeX = sizeX;
		this._sizeY = sizeY;


		this._offsetX = 0;
		this._offsetY = 0;

		this._registry = new Array(sizeX* sizeY);
		this._nullLocation = -1;
	}

	Reset()
	{
		this._offsetX = 0;
		this._offsetY = 0;
		this._registry = new Array(this._sizeX* this._sizeY);
	}
	
	Claim( loc, marker)
	{
		let tileIdx = this.FindLocation(loc);
		console.log("ClaimingLocation: TileLoc "+loc.x+" , "+loc.y+" at array "+tileIdx);
		
		this._registry[tileIdx] = marker;
	}

	Release (loc, Marker)
	{
		let tileIdx = this.FindLocation(loc);
		console.log("ReleasingLocation: TileLoc "+loc.x+" , "+loc.y+" at array "+tileIdx);
		
		this._registry[tileIdx] = null; //TODO - what should be null  by convention
	}

	IsClaimed(loc)
	{
		var locIdx = this.FindLocation(loc);
		//console.log("LocationRegistry: "+locIdx+" "+this._registry[locIdx]);
		return this.IsClaimedCore(locIdx);
	}

	IsClaimedCore(locIdx)
	{
		return !(this._registry[locIdx] === undefined || this._registry[locIdx] === null);
	}

	ClaimData(loc)
	{
		var locIdx = this.FindLocation(loc);
		return this._registry[locIdx];
	}

	//lays out columns first
	FindLocation(loc)
	{
		var ret = ((loc.x + this._offsetX) % this._sizeX) * this._sizeY + ((loc.y + this._offsetY) % this._sizeY);
		if (loc.x < 0 || loc.y < 0)
			console.log("FindLocation: loc.x "+loc.x+" loc.y "+loc.y+" offset X "+this._offsetX+" offset Y "+this._offsetY+" sizeX "+this._sizeX+" sizeY "+this._sizeY+" ret "+ret);
		
		return ret;
	}

	Shift(delta)
	{
		this._offsetX += delta.x;
		this._offsetY += delta.y;

	}

	//offset - tileLocationSpace of the left most edge
	calculateAGlobalSpot(locXY,offset)
	{
		return {
			x: offset + ((locXY.x  - (offset % this._sizeX) + this._sizeX) % this._sizeX),
			y: locXY.y 
		}
	}

	findBestOpen(gradingFunction)
	{
		var bestLoc = this._nullLocation;

		for (var idx = 0; idx < this._registry.length;idx++)
		{
			if (!this.IsClaimedCore(idx))
			{
				if (bestLoc == this._nullLocation || gradingFunction.isBetter(this.toLocalXY(idx),this.toLocalXY(bestLoc),this))
					bestLoc = idx;
			}
		}
		return this.toLocalXY(bestLoc);
	}

	toLocalXY(locationIdx)
	{
		return {
			x: Math.floor(locationIdx /this._sizeY),
			y : Math.floor(locationIdx % this._sizeY)
		}
	}
}