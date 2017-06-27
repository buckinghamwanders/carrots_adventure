export default class IdString {

	const SEPARATOR = "."
	constructor(ibaseId)
	{
		this._idStr = baseId;
	}
		
	resetId(startId)
	{
		this._idStr = startId;
	}

	appendParent(nextId)
	{
		this._idStr = nextId + SEPARATOR + this._idStr;
		return this;
	}
				
}