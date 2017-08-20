export default class TileLibrary {

	constructor()
	{
		this._tileConfigurationTable = {};
	}

	addConfiguration(name, configuration)
	{
		this._tileConfigurationTable[name] = configuration;
		return this;
	}

	tileNames() 
	{
		return Object.keys(this._tileConfigurationTable);
	}

	tile(tileName)
	{
		return this._tileConfigurationTable[tileName];
	}

}

