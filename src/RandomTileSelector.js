/**********************************************

Simple weighted random selector


**********************************************/
export default class RandomTileSelector 
{
	constructor()
	{
		this._weightTable = {};

	}

	/**
	Called by arranger to allow the tile selector to get the correct labels;
	**/

	initializeFromLibrary(tileLibrary)
	{
		var tNames = tileLibrary.tileNames();
		var length = tNames.length;
		for (var i = 0; i < length; i++)
		{
			var tName = tNames[i];
			this.addWeight(tName,tileLibrary.tile(tName).weight());
			//this.installWeight(tName);
		}
	}

	addWeight(name, weight)
	{
		this._weightTable[name] = weight;
	}


	selectLabel(loc)
	{
		var changeFunctions = Object.keys(this._weightTable);
		var totalWeight = Object.values(this._weightTable).reduce(function(w,t) {return w+t;},0);
		var indexWeight = Math.random() * totalWeight;
		var index = (Math.floor(changeFunctions.length * Math.random())) % changeFunctions.length;
						
		//Debug this needs to be removed is test of code
		for (var i = 0; i < changeFunctions.length;i++)
		{
			indexWeight -= this._weightTable[changeFunctions[i]];
			if (indexWeight <= 0)
			{
				index = i;
				break;
			}
		}
		return {tile:changeFunctions[index], source:"random"};
	}
}