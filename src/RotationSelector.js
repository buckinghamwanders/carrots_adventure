export default class RotationSelector {
	constructor(items)
	{
		this._items = items;
		this._idx = 0;
	}

	select(context)
	{
		let ret = this._items[this._idx];
		this._idx = (this._idx + 1) % this._items.length;
		return ret;
	}

	clear()
	{
		this._idx = (this._idx + 1) % this._items.length;
		
	}
}


