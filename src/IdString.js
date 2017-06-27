export default class IdString {

	

	constructor(baseId)
	{
		this._idStr = baseId.toString();
		this.SEPARATOR = "."
	}
		
	resetId(startId)
	{
		this._idStr = startId.toString();
	}

	appendParent(nextId)
	{
		this._idStr = nextId.toString() + this.SEPARATOR + this._idStr;
		return this;
	}


	compareId(otherId)
	{
		let split1 = this._idStr.split(this.SEPARATOR);
		let split2 = otherId._idStr.split(this.SEPARATOR);
		
		const NO_MATCH = -1;
		let maxIdx = Math.min(split1.length,split2.length);
		let ret = NO_MATCH;
		for (let i = 0; i < maxIdx; i++)
		{
			if (split1[i] != split2[i])
				return ret
			ret = i;
		}
		return ret;
	}

	Id()
	{
		return this._idStr;
	}

	Length()
	{
		return this.idStr.split(this.SEPARATOR).length;
	}
				
}