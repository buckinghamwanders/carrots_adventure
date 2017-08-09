import TileEntity from './TileEntity.js';

export default class TileWorld {
	constructor()
	{
		
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